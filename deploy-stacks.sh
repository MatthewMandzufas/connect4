#! /bin/bash

ECR_STACK=ECRWorkshopStack

VPC_STACK=VPCWorkshopStack
VPC_NAME=Connect4VPC

ECS_STACK=ECSWorkshopStack

echo "Creating ECR stack"
bash deploy-ecr.sh "${ECR_STACK}"

REPOSITORY_URI=$(aws cloudformation describe-stacks --stack-name "${ECR_STACK}" | jq -r '.Stacks[0].Outputs[] | select(.OutputKey == "RepositoryURI") | .OutputValue')
ACCOUNT=$(aws sts get-caller-identity | jq -r .Account)
PASSWORD=$(aws ecr get-login-password)
PATH_TO_CONNECT4="../../ui-workshops/connect-4"

pushd "${PATH_TO_CONNECT4}"
docker login -u AWS --password "${PASSWORD}" "${REPOSITORY_URI}"
docker buildx build -f .devcontainer/Dockerfile -t connect4:latest .
docker tag connect4:latest "${REPOSITORY_URI}:latest"
docker push "${REPOSITORY_URI}:latest"
popd

echo "Creating VPC stack"
bash deploy-vpc.sh "${VPC_STACK}" "${VPC_NAME}"

echo "Creating ECS stack"
bash deploy-ecs.sh "${ECS_STACK}" "${ECR_STACK}" "${VPC_STACK}"

 
#! /bin/bash

ECR_STACK=ECRWorkshopStack
VPC_STACK=VPCWorkshopStack
VPC_NAME=Connect4VPC
ECS_STACK=ECSWorkshopStack


echo "Creating ECR stack"
CALLING_USER_ARN=$(aws sts get-caller-identity | jq -r .Arn)
aws cloudformation deploy --template-file ./ecr.cfn.yml --stack-name "${ECR_STACK}" --parameter-overrides CallingUserArn="${CALLING_USER_ARN}"


REPOSITORY_URI=$(aws cloudformation describe-stacks --stack-name "${ECR_STACK}" --output json | jq -r '.Stacks[0].Outputs[] | select(.OutputKey == "RepositoryURI") | .OutputValue')
PASSWORD=$(aws ecr get-login-password)

echo "Building image"

docker login -u AWS --password "${PASSWORD}" "${REPOSITORY_URI}"
docker buildx build -f .devcontainer/Dockerfile -t connect4:latest .
docker tag connect4:latest "${REPOSITORY_URI}:latest"
docker push "${REPOSITORY_URI}:latest"

echo "Creating VPC stack"
aws cloudformation deploy --template-file ./vpc.cfn.template.yml --stack-name "${VPC_STACK}" --parameter-overrides VPCName="${VPC_NAME}"

PUBLIC_SUBNET_ID=$(aws cloudformation describe-stacks --stack-name "${VPC_STACK}" --output json | jq -r '.Stacks[0].Outputs[] | select(.OutputKey == "PublicSubnetId") | .OutputValue')
VPC_ID=$(aws cloudformation describe-stacks --stack-name "${VPC_STACK}" --output json | jq -r '.Stacks[0].Outputs[] | select(.OutputKey == "VPCId") | .OutputValue')



echo "Creating ECS stack"
aws cloudformation deploy --template-file ./ecs.cfn.template.yml --stack-name "${ECR_STACK}" --parameter-overrides ECRRepositoryURI=${REPOSITORY_URI} PublicSubnetId=${PUBLIC_SUBNET_ID} VPCId=${VPC_ID} --capabilities "CAPABILITY_NAMED_IAM"
 
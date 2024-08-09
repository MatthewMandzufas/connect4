#!/bin/bash

ECR_STACK=ECRWorkshopStack
VPC_STACK=VPCWorkshopStack
ECS_STACK=ECSWorkshopStack
REPOSITORY=workshop-repository
LOG_GROUP_NAME=connect-4-logs


echo 'Tearing down ECR Repository'

aws ecr delete-repository --repository-name ${REPOSITORY} --force

echo 'Tearing down log group'

aws logs delete-log-group --log-group-name ${LOG_GROUP_NAME}

echo 'Tearing down ECR stack'

aws cloudformation delete-stack --stack-name ${ECR_STACK} 

echo 'Tearing down VPC stack'

aws cloudformation delete-stack --stack-name ${VPC_STACK}

echo 'Tearing down ECS stack'

aws cloudformation delete-stack --stack-name ${ECS_STACK} 
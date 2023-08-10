#!/bin/sh

cd /home/ec2-user/app

# Docker Hub 에서 이미지를 가져오기 위해 로그인 수행
docker_hub_password=$(aws secretsmanager get-secret-value \
    --secret-id dev-beebee/prod/docker-hub-password \
    --region ap-northeast-2 \
    --query 'SecretString' \
    --output text | jq .docker_hub_password | tr -d '"')
echo -e "Docker hub login ... "
docker login -u="qjqdn1568" -p=${docker_hub_password}
echo -e "도커 로그인 : ${docker_hub_password}"

if [ "$DEPLOYMENT_GROUP_NAME" == "staging" ]; then
    # 배포 그룹이 릴리즈인 경우
    echo -e "Docker Compose build ..."
    docker-compose -f docker-compose.test.yml up --build -d
else
    # 배포 그룹이 프로덕션인 경우
    echo -e "Docker Compose build ..."
    docker-compose -f docker-compose.prod.yml up --build -d
fi

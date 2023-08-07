#!/bin/sh

sudo yum update -y

docker -v
sudo service docker start

docker-compose -v
echo "Install docker-compose Finish ..."

sudo yum install jq -y

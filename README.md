# PotenDay 308 Nestjs API Server

## Overview

This project was developed for configuring API server for Potenday 308 .
This project is currently incomplete and will continue to improve.
From the configuration items below, you can see what parts will be added in the future.

<br/>

## **Configuration**

- [x] Config Service ([@nestjs/config](https://docs.nestjs.com/techniques/configuration))
- [x] [MessageQueue](https://docs.nestjs.com/techniques/queues)
- [x] Docker
- [x] [Database (typeorm)](https://docs.nestjs.com/techniques/database)
- [x] Swagger
- [ ] i18
- [ ] e2e Test
- [x] git action
- [ ] API versioning

<br/>

## Set up

### clone project

```bash
git clone https://github.com/308TEN009/potenday-be.git
```

<br/>

### set up postgres database (optional)

```bash
# start db-postgres with docker-compose file
docker-compose -f docker-compose.dev.yml up db-postgres --build -d

# access postgres docker container
☁ docker exec -it db-postgre-local /bin/bash

☁ /# psql -U postgres
☁ postgres=# CREATE USER {user_name} PASSWORD '{password}' SUPERUSER;
☁ postgres=# CREATE DATABASE {database name} OWNER root;
☁ postgres=# \l
```

<br/>

### set up development env file

```bash
cat ./server/envs/.env.development

# init varaibles /server/envs/.env.development
# Set the database connection related environment variables
# and the redox connection environment variables.
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_USERNAME=<<You are Dev Database user name>>
POSTGRES_PASSWORD=<<You are Dev Database password>>
POSTGRES_DATABASE=<<You are Dev Database database name>>

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=<<You are Dev Redis password>>

JWT_PUBLIC_KEY=
JWT_PRIVATE_KEY=

LOGIN_SUCCESS_REDIRECT_URL='http://127.0.0.1/api'

KAKAO_CALLBACK_URL='http://127.0.0.1/auth/login/kakao/callback'
KAKAO_CLIENT_ID=

NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=
NAVER_CALLBACK_URL='http://127.0.0.1/auth/login/naver/callback'

NAVER_MAIL_HOST='smtp.naver.com'
NAVER_MAIL_PORT=587
NAVER_MAIL_USER=
NAVER_MAIL_PASS=
NAVER_MAIL_FROM=
```

All corresponding environment variables must be set. Otherwise, `EnvMissingError` occurs.

For redis, the `docker-compose` file is set to use the `REDIS_PASSWORD` set in the env file.

<br/>

### start server

```bash
# start server in root path
source ./scripts/start.dev.sh

# logs
docker logs -f nestjs-app
```

When running for the **first time** after the project git clone, the development environment Docker Database configuration may take time and cause errors. In that case, you should wait **approximately 5 seconds before running the above script again**.

<br/>

## Usage

### Migration

#### generate migration (TypeORM)

```bash
source ./migration.generate.sh \
dev \
src/database/data-sources/postgres.datasource.ts \
./src/database/migrations/{migration_file_name}
```

The first parameter should provide an environment to which migration will be applied, select `dev` or `prod`. The second parameter provides the path to the data source file. If the path does not need to be received when executing the script file, substitute a string to the value of the corresponding variable. The third parameter provides the path through which the migration file will be created.

<br/>

#### run migration (TypeORM)

```bash
source ./migration.run.sh \
dev \
./src/database/data-sources/postgres.datasource.ts
```

same as above

<br/>

### Swagger Document

```
http://<<local>>:80/api
```

<br/>

### Message Queue Monitoring

```
http://<<local>>:80/bull-board
```

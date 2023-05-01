# Product API

API responsible for managing all products.

|         Table of Contents         |
| :-------------------------------: |
|   [Requirements](#requirements)   |
|    [Run Project](#run-project)    |
|       [Commands](#commands)       |

## Requirements / Prerequisites

- [Node 18.16.0](https://nodejs.org);
- [Yarn 1.22.19](https://classic.yarnpkg.com/en/);
- [Docker 23.0.4](https://www.docker.com/)

## Run Project

```
# create env file
cp sample.env .env (change the values with yout need)
# execut yarn local to run docker compose
```

## Commands

- `yarn lint` to see possible lint errors;
- `yarn format` to fix possible lint errors;
- `yarn build` to application build;
- `yarn dev` to run local application;
- `yarn local:up` to up docker compose application
- `yarn local:down` to down docker compose application
- `yarn test` to run all test (unit and integration)
- `yarn test:unit` to run all unit test
- `yarn test:integration` to run all integration test
- `yarn migration` to run prisma migration (its runs in docker compose)


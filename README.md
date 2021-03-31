### Backend Test

[![Build Status](https://travis-ci.org/belezanaweb/test-nodejs.svg?branch=master)](https://travis-ci.org/belezanaweb/test-nodejs)

Esta é uma avaliação básica de código.

O objetivo é conhecer um pouco do seu conhecimento/prática de RESTful e NodeJS.

Recomendamos que você não gaste mais do que 4 - 6 horas.

Faça um fork deste repositório.

Ao finalizar o teste, submeta um pull request para o repositório que nosso time será notificado.

### Tarefas

Com a seguinte representação de produto:

```json
{
  "sku": 43264,
  "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
  "inventory": {
    "quantity": 15,
    "warehouses": [
      {
        "locality": "SP",
        "quantity": 12,
        "type": "ECOMMERCE"
      },
      {
        "locality": "MOEMA",
        "quantity": 3,
        "type": "PHYSICAL_STORE"
      }
    ]
  },
  "isMarketable": true
}
```

Crie endpoints para as seguintes ações:

- [x] Criação de produto onde o payload será o json informado acima (exceto as propriedades **isMarketable** e **inventory.quantity**)

- [x] Edição de produto por **sku**

- [x] Recuperação de produto por **sku**

- [x] Deleção de produto por **sku**

### Requisitos

- [x] Toda vez que um produto for recuperado por **sku** deverá ser calculado a propriedade: **inventory.quantity**

        A propriedade inventory.quantity é a soma da quantity dos warehouses

- [x] Toda vez que um produto for recuperado por **sku** deverá ser calculado a propriedade: **isMarketable**

        Um produto é marketable sempre que seu inventory.quantity for maior que 0

- [x] Caso um produto já existente em memória tente ser criado com o mesmo **sku** uma exceção deverá ser lançada

        Dois produtos são considerados iguais se os seus skus forem iguais

- [x] Ao atualizar um produto, o antigo deve ser sobrescrito com o que esta sendo enviado na requisição

        A requisição deve receber o sku e atualizar com o produto que tbm esta vindo na requisição

### Dicas

- Os produtos podem ficar em memória, não é necessário persistir os dados
- Testes são sempre bem-vindos :smiley:

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Backend Challenge for Beleza na Web.

## Stack

```bash
   Node.JS - Is a JavaScript runtime built on V8 engine (https://nodejs.org/en/)
   Typescript - Is a typed superset of JavaScript that compiles to plain JavaScript (https://www.typescriptlang.org/)
   NestJS - A progressive architectural framework for node.js (https://nestjs.com/)
   Express - A HTTP Provider to Node.JS (https://expressjs.com/pt-br/)
```

## Prerequisites

```bash
- node lastest LTS version (12.x) of node installed on your machine
```

## Installing dependencies

```bash
- run the following cmd:
  npm i
- check if after executed the cmd above, generated a folder called node_module at root of project
```

## Project Organization (architecture/structure)

```bash
├── .env               <- env file.
├── node_modules       <- packages of node/third part, only at development time (npm run install create this folder).
├── dist               <- the compiled javascript, only at development time (nest compiles typescript to javasctipt).
├── test               <- has the entity based folters with the e2e tests.
├── src                <- Source code for use in this project.
│   ├── modules O(n)      <- folder containing the modules, based on entity.
│   │   ├── [module-name]     <- modules structured on hexagonal architecture and feature/entity folder based
│   │   │   ├── [module-name].controller.ts  <- controller of the module (might not exists depending of the module).
│   │   │   ├── [module-name].entity.ts      <- the class that represents the entity/table of the module (might not exists depending of the module).
│   │   │   ├── [module-name].module.ts      <- the module root, where is setup what is export from module or import into module (required in all modules).
│   │   │   ├── [module-name].service.ts     <- the layer that is responsbile for the business rules and logic, it orchestrate and uses the repositories.
│   │   │   ├── [module-name].repository.ts  <- the layer that is responsbile for the data access, it have direct access to the database operations, this file will exists only if is needed a custom repository.
│   │   ├── index.ts          <- read all modules (folders) and get all roots of the modules (loader).
│   ├── shared            <- folder with the abstractions that can used on different modules of the project (DRY concept).
│   │   ├── controllers O(n)  <- has controllers with some kind of abstractation.
│   │   ├── filters O(n)      <- has the filters (files) that are applied universal by type on the app (filter is a abstraction to handle errors and send a friendly/custom response to the client).
│   │   ├── interceptors O(n) <- has the interceptors (files) that are applied on controllers, interceptor is a middleware abstraction that is executed between the request/response and the handler/client and can change the behavior of the request or response.
│   │   ├── modules O(n)      <- has loader modules (files), a root file that imports/exports a bundle of components/abstractions that are used in common in some part.
│   │   ├── services O(n)     <- has services (files), that can be used in different parts/modules.
│   ├── main.ts               <- bootstrap (init) the server
│   ├── app.module.ts         <- load all sub-modules (each child-folder of src is a module)
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Descrição

Teste Node.js - Beleza na Web - Product

## Desenvolvimento

Desenvolvimento conta com API Rest, testes Unitários, testes E2E, validação de JSON, banco de dados NoSQL MongoDB, openAPI e docker. Desenvolvido utilizando Node.js, Typescript, Nest.js, MongoDB, Mongoose, Mongo-Express, MongoDB Memory Server, Jest, Supertest, Class-validator, Class-transformer, Swagger, Docker.

## Pré-requisitos

```bash
- Node.js
- npm ou yarn
- Docker
```

## Instalação dos pacotes

```bash
# npm
$ npm install
  ou
# yarn
$ yarn install
```

### Instruções para iniciar a aplicação

A API pode ser iniciada de duas maneiras, podendo ser acessada em um container via Docker(1°) ou localmente(2°).

## 1° - Execução com Docker

Na raiz do projeto execute o comando para a criação do container Docker com a API e banco de dados

```bash
# comando para criação do container em background
$ docker-compose up -d
```

O container será criado e a API estará acesível em:

```bash
$ http://localhost:3001

```

## 2° - Execução Local

Na raiz do projeto execute o comando abaixo para criação do container Docker com o banco de dados

```bash
# comando para criação do container em background
$ docker-compose up -d
```

Após a criação do container, na raiz do projeto execute o comando abaixo para iniciar a aplicação:

```bash
# npm
$ npm run start
  ou
# yarn
$ yarn start
```

A API será iniciada e estara disponível em:

```bash
$ http://localhost:3000

```

## Collections para acessar a API - Insomnia/Postman

Na raiz do projeto na pasta API-collections está disponível 2 documentos com o seguinte nome:

```bash
# Collection da API para Insomnia
$ COLLECTION-Insomnia-BELEZANAWEB
  e
# Collection da API para Postman
$ COLLECTION-Postman-BELEZANAWEB
```

Está disponível as collections para serem importadas via Postman ou Insomnia.
Após realizar a importação da collection no software, terá disponível 2 pastas com os seguintes nomes:

```bash
# 1°
$ Product - DOCKER
  e
# 2°
$ Product - LOCAL
```

Caso tenha escolhido a execução com Docker, acesso a opção 1°, mas caso tenha escolhido a execução Local, acesse a opção 2°. Após isto terá acesso a API.

## Testes

Para realizar a execução dos testes, na raiz do projeto execute os comandos a seguir:

```bash
# testes unitários
$ npm run test
  ou
$ yarn test

# testes e2e
$ npm run test:e2e
  ou
$ yarn test:e2e

# testes com cobertura
$ npm run test:cov
  ou
$ yarn test:cov
```

---

### Tarefa

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

- [ ] Criação de produto onde o payload será o json informado acima (exceto as propriedades **isMarketable** e **inventory.quantity**)

- [ ] Edição de produto por **sku**

- [ ] Recuperação de produto por **sku**

- [ ] Deleção de produto por **sku**

### Requisitos

- [ ] Toda vez que um produto for recuperado por **sku** deverá ser calculado a propriedade: **inventory.quantity**

        A propriedade inventory.quantity é a soma da quantity dos warehouses

- [ ] Toda vez que um produto for recuperado por **sku** deverá ser calculado a propriedade: **isMarketable**

        Um produto é marketable sempre que seu inventory.quantity for maior que 0

- [ ] Caso um produto já existente em memória tente ser criado com o mesmo **sku** uma exceção deverá ser lançada

        Dois produtos são considerados iguais se os seus skus forem iguais

- [ ] Ao atualizar um produto, o antigo deve ser sobrescrito com o que esta sendo enviado na requisição

        A requisição deve receber o sku e atualizar com o produto que tbm esta vindo na requisição

### Dicas

- Os produtos podem ficar em memória, não é necessário persistir os dados
- Testes são sempre bem-vindos :smiley:

### test-nodejs Boticario

## Requirements
- Node (v18.16.0)
- NPM (v9.5.1) or yarn (v1.22.19)

## Install dependencies
```sh
$ npm i
```
## Running project
```sh
$ npm run start:dev
```

## Running tests
```sh
$ npm run test
```

## Documentation

- Apos rodar o projeto acesse o link `http://localhost:8080/api`

## UseCases
- Create Product
- Get Product
- Update Product
- Delete Product

### Observations

- Realizei a deleção para deleção logica (Soft-Delete)
- Foi disponibilizado na raiz do projeto uma collection do postman de produtos `Product - Boticario.postman_collection.json`

### Tarefas

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

# Backend Test
[![Build Status](https://travis-ci.org/belezanaweb/test-nodejs.svg?branch=master)](https://travis-ci.org/belezanaweb/test-nodejs)

## Tarefas

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

- [X] Criação de produto onde o payload será o json informado acima (exceto as propriedades **isMarketable** e **inventory.quantity**)

- [X] Edição de produto por **sku**

- [X] Recuperação de produto por **sku**

- [X] Deleção de produto por **sku**

### Requisitos

- [X] Toda vez que um produto for recuperado por **sku** deverá ser calculado a propriedade: **inventory.quantity**

        A propriedade inventory.quantity é a soma da quantity dos warehouses

- [X] Toda vez que um produto for recuperado por **sku** deverá ser calculado a propriedade: **isMarketable**

        Um produto é marketable sempre que seu inventory.quantity for maior que 0

- [X] Caso um produto já existente em memória tente ser criado com o mesmo **sku** uma exceção deverá ser lançada

        Dois produtos são considerados iguais se os seus skus forem iguais


- [X] Ao atualizar um produto, o antigo deve ser sobrescrito com o que esta sendo enviado na requisição

        A requisição deve receber o sku e atualizar com o produto que tbm esta vindo na requisição


## Primeiros Passos
1- clone esse repositório

2- rode o comando abaixo
```
npm install
```
3- rode esse comando:
```
npm start
```

6- TÁ PRONTO O SORVETINHOOOOO!

## Scripts Disponíveis:
* `npm run start` para rodar a aplicação
* `npm run dev` para iniciar a aplicação com hot reload
* `npm run test` para testar a aplicação

Obs: como o projeto não foi conectado a um banco de dados, assim que você dá um Ctrl + C no npm run start ou recarrega a aplicação no npm run dev, você precisa criar tudo de volta!

## Funcionalidades:
* Criar produto
* Recuperar/pegar produto por sku
* Editar produto
* Deletar produto

## Endpoints:
* [Postman](https://documenter.getpostman.com/view/13242152/TzCTZRAB)
* [Endpoints](ENDPOINTS.md)



*Desenvolvido com 🧡 por Nicole Zolnier*
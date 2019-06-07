### Backend Test Complete
Teste completo. 
Para iniciar a avaliação, após clonar o repositório:

```bash
$ npm install
```
Para rodar a aplicação em uma porta específica crie um arquivo .env, no diretório raíz da aplicação com os parâmetros abaixo:

```env
PORT=7801
```

Desta forma a aplicação subirá na porta 7801, sem o arquivo .env a aplicação sobe por padrão na porta 4000.
Uma vez configurada, a aplicação pode ser subida com o comando npm start:

```bash
$ npm start
```

Ou usnado-se o comando node:


```bash
$ node index.js
```

Para executar os testes automatizados você precisa instalar os pacotes listados em "devDependecies", no arquivo package.json.
Use o comando:

```bash
$ npm test
```
A cobertura de testes é de aproximadamente 50%.

### Endpoints
a aplicação possui cinco edpoints:

#### POST /products
Enviando uma JSON com o formato abaixo será criado um novo produto na aplicação:

```json
{
    "sku": 43264,
    "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
    "inventory": {
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
    }
}
```
#### GET em /products/list
Retorna um array como o abaixo:
```json
[
    {
        "sku": 43265,
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
]
```

#### GET em /products/:sku
Retorna o produto identificadoo pelo sku:
```json
{
    "sku": 43265,
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

#### PUT em /products/:sku
Atualisa e retorna o produto identificadoo pelo sku, enviando-se um JSON como o abaixo:
```json
{
    "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
    "inventory": {
        "warehouses": [
            {
                "locality": "SP",
                "quantity": 0,
                "type": "ECOMMERCE"
            },
            {
                "locality": "MOEMA",
                "quantity": 0,
                "type": "PHYSICAL_STORE"
            }
        ]
    }
}
```

Deve retornar um JSON como o abaixo:

```json
{
    "sku": 43265,
    "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
    "inventory": {
        "quantity": 0,
        "warehouses": [
            {
                "locality": "SP",
                "quantity": 0,
                "type": "ECOMMERCE"
            },
            {
                "locality": "MOEMA",
                "quantity": 0,
                "type": "PHYSICAL_STORE"
            }
        ]
    },
    "isMarketable": false
}
```

#### DELETE em /products/:sku
Exclui o produto e retorna "true" en caso de sucesso.



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

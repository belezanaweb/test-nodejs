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

### Executando a aplicação

### Conteúdo

- [Dependências](#dependências)
- [Instalação](#instalação)
- [Modo de usar](#modo-de-usar)
- [Testes](#testes)
- [Suporte](#suporte)
- [Contribuição](#contribuição)
- [Observação](#observação)

### Dependências

Tecnologias que o projeto utiliza.

-  [NodeJS](https://nodejs.org/en/download/)
-  [Docker](https://docs.docker.com/get-docker/)
-  [Docker Compose](https://docs.docker.com/compose/install/)
-  [VSCode](https://code.visualstudio.com/download)
-  [Postman](https://www.postman.com/downloads/)

### Instalação

Após clonar o projeto, execute os passos abaixo:

### Execução

Para executar a aplicação utilizando docker:

```sh
docker-compose up  -d  --build
```  

### Execução no ambiente de desenvolvimento

#### Criar .env contendo as configurações do projeto:

Criar o arquivo `.env` baseado no `.env.example`. Esse arquivo contém as informações para execução da aplicação, como: porta e host;

#### Instalar dependências do projeto:
```sh
npm install
```

#### Executando o projeto:
```sh
npm start
```

#### A aplicação estará rodando em:
```sh
http://localhost:3000
```

## Modo de usar

Com a aplicação em execução, há duas maneiras de consumir seus recursos:

### 1. Acessando os recursos da api manualmente:

#### Inserir produtos
```
curl --location 'localhost:3000/api/v1/products' \
--header 'Content-Type: application/json' \
--data '{
    "sku": 43261,
    "name": "L'\''Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
    "inventory": {
        "warehouses": [
            {
                "locality": "SP",
                "quantity": 10,
                "type": "ECOMMERCE"
            },
            {
                "locality": "MOEMA",
                "quantity": 4,
                "type": "PHYSICAL_STORE"
            },
            {
                "locality": "FRANCA",
                "quantity": 0,
                "type": "PHYSICAL_STORE"
            }
        ]
    }
}'
```

#### Listar todos os produtos
```
curl --location 'localhost:3000/api/v1/products'
```

#### Listar produto pelo sku (código identificador do produto)
```
curl --location 'localhost:3000/api/v1/products/43261'
```

#### Atualizar produto pelo sku
```
curl --location --request PUT 'localhost:3000/api/v1/products/43261' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Produto Teste",
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
            },
            {
                "locality": "FRANCA",
                "quantity": 0,
                "type": "PHYSICAL_STORE"
            }
        ]
    }
}'
```

#### Remover produto pelo sku
```
curl --location --request DELETE 'localhost:3000/api/v1/products/43261'
```

### 2. Utilizando a coleção do postman:

É possível importar o arquivo `belezanaweb.json` que se encontra no diretório `/.docs` via `postman`. Após importar o mesmo, as rotas listadas acima, serão importadas no seu postman.

### Testes

Os testes do projeto encontram-se dentro da pasta `./test`, na qual utiliza as dependências `jest`. Para executar a suíte de teste execute o comando:


### Executar os testes:
```sh
$ npm  test
```

### Suporte

Por favor [abra uma issue](https://github.com/rafamagalhas/desafio-api-menu/issues/new) para suporte. 

### Contribuição

1. Faça um fork do projeto.
2. Crie sua feature branch (`git checkout -b my-new-feature`).
3. Commit suas alterações (`git commit -am 'Add some feature'`).
4. Faça um push de sua branch (`git push origin my-new-feature`).
5. Crie uma nova [pull request](https://github.com/rafamagalhas/test-nodejs/pulls).

### Observação

Esse projeto utiliza o `husky` para executar algumas ações, uma delas é o `pre-push`. Ou seja, antes que o git push seja executado, os testes serão rodados.

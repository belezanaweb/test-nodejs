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

### Dicas

- Os produtos podem ficar em memória, não é necessário persistir os dados
- Testes são sempre bem-vindos :smiley:

### Instruções para utilização
 - Para execução dos testes basta instalar as dependências do projeto e executar o script de test
 npm install
 npm test
 tentei cobrir o máximo possível do código com testes

 - para execução do projeto em modo de desenvolvimento basta executar o seguinte script
 npm run dev
 desse modo irá executar o servidor e ele estará disponível em http://localhost:3333

 - para execução do projeto com a build basta executar os seguintes scripts
 npm run build
 npm run start

### Exemplos de chamadas HTTP

- Create
curl --request POST \
  --url http://localhost:3333/products \
  --header 'Content-Type: application/json' \
  --data '{
	"sku": 43264,
	"name": "L'\''Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
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
    }
}'

- Find
curl --request GET \
  --url http://localhost:3333/products/43264

- Update
curl --request PUT \
  --url http://localhost:3333/products/43264 \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "Atualizado",
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
    }
}'

- Delete
curl --request DELETE \
  --url http://localhost:3333/products/43264

### Backend Test

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


# API de Inventório
Esta API foi criada com o objetivo de servir como um gerenciador de estoque de produtos de beleza

## Como usar
Clone o projeto e execute
```javascript
npm install
```
para instalar os modulos necessários

## Recursos
### Encontrar Produtos
- Endpoint: /get/<sku>
- Método: GET
- Descrição: Passe um valor válido como parâmetro 'sku' na URL. A API retornará o objeto com o SKU solicitado caso exista em memória, ou erro caso o produto não exista.

### Adicionar Produtos
- Endpoint: /create
- Método: POST
- Tipo de body: JSON
- Exemplo de body: 
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
- Descrição: Este endpoint cria um novo produto na memória usando o objeto JSON passado no body da requisição. O campo "sku" no objeto do novo produto é OBRIGATÓRIO e um erro será retornado caso ele não exista. Se o sku do novo objeto já existir em memória, a API retornará erro e não criará o produto duplicado.

### Editar Produtos
- Endpoint: /edit
- Método: POST
- Tipo de body: JSON
- Exemplo de body: 
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
- Descrição: Este recurso recebe um JSON no corpo da requisição e usando o valor do campo 'sku' editará o produto já existente em memória. O objeto antigo será sobreescrito pelo novo e caso seja solicitado um SKU inexistente, a API retornará erro.

### Remover Produtos
- Endpoint: /delete/<sku>
- Método: GET
- Descrição: Usando o parâmetro 'sku' passado na URL da requisição, a API encontrará o produto relacionado na memória e o excluirá. Produtos apagados não podem ser recuperados e caso não exista um produto com o SKU solicitado, um erro será retornado.

### Checar Memória
- Endpoint: /check_stock
- Método: GET
- Descrição: Ao consumir este recurso, a API retornará uma cópia do estado atual da memória para consulta

## Tecnologias usadas
- Node.Js
- Express

## Observações
Para facilitar o teste e consumo da API, basta utilizar o link do Postman abaixo, que já conta com os endpoints configurados para uso:
https://www.getpostman.com/collections/54cadcf65a7be8769b44

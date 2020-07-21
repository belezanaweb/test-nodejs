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

---
## Desenvolvido por Marina Isabel 💻
- [Linkedin](https://www.linkedin.com/in/marinaisabel/)

### Começando
  Para executar o projeto, será necessário instalar os seguintes programas:
  - [Node.js e Express](https://medium.com/@pedrompinto/tutorial-node-js-como-usar-o-express-js-7d3027f4f57b)
  - [Knex](http://knexjs.org/)
  
### Desenvolvimento
  Para iniciar o desenvolvimento, é necessário clonar o projeto do GitHub num diretório de sua preferência:
  
  ``cd "Pasta do arquivo"
    git clone arquivo github
    ``
### Configuração
  Para configurar o arquivo, é preciso instalar as depêndencias
  - Node e Typesript
    `npm init`
    `npm install typscript @types/node ts-node-dev`
  - Banco de dados 
    `npm install knex mysql @types/knex dotenv`
  - Express 
    `npm install express@4.17.0 @types/express@4.17.0`
  - UUID 
    `npm install uuid @types/uuid`
  - JWT 
    `npm install jsonwebtoken @types/jsonwebtoken`
    
### Instruções para rodar
As instruções são:
- `npm install` para instalar todas as dependências;
- `npm run start` para rodar localmente o projeto
- `npm run build` para gerar uma versão possível de ser deployada com 
os arquivos transpilados para Javascript    
    
Esse é um projeto de Backend feito utilizando NodeJS, Express e Typescript.

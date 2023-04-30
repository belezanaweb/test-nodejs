# Desafio Beleza na Web (Arthur Ferreira)

Este projeto é uma API RESTful desenvolvida em Node.js com TypeScript, que implementa a funcionalidade de gerenciamento de produtos. A API permite criar, atualizar, excluir e obter produtos por SKU, além de calcular a propriedade isMarketable.

<br/>

## Table of Contents
1. [Execução](#execução)
2. [Endpoints](#endpoints)
3. [Design](#design)
4. [Autor](#autor)

<br/>

## Execução

Para executar a aplicação, basta rodar o seguinte comando:

    npm run start

<br/>

## Endpoints

A API possui os seguintes endpoints:

<br/>

### **POST /products**

Cria um novo produto.

    POST /products

Body:

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

Resposta

Código: **201 Created**

<br/>

### **GET /products/:sku**

Obtém um produto pelo SKU.

    GET /products/43264

Resposta

Código: **200 OK**

Response Body:

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
<br/>

### **PUT /products/:sku**

Atualiza um produto pelo SKU.

    PUT /products/43264

Body:

```json
{
  "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 1kg",
  "inventory": {
    "warehouses": [
      {
        "locality": "SP",
        "quantity": 20,
        "type": "ECOMMERCE"
      },
      {
        "locality": "MOEMA",
        "quantity": 10,
        "type": "PHYSICAL_STORE"
      }
    ]
  }
}
```

Resposta

Código: **200 OK**

Response Body:

```json
{
  "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 1kg",
  "inventory": {
    "quantity": 30,
    "warehouses": [
      {
        "locality": "SP",
        "quantity": 20,
        "type": "ECOMMERCE"
      },
      {
        "locality": "MOEMA",
        "quantity": 10,
        "type": "PHYSICAL_STORE"
      }
    ]
  },
  "isMarketable": true
}
```

<br/>

### **DELETE /products/:sku**

Deleta/remove um produto por seu SKU

    DELETE /products/43264

Resposta

Código: **204 No Content**

<br/>

## Design

<br/>

### **Architecture**

Dependendo do propósito deste projeto, eu teria utilizado o padrão KISS (Keep it simple, stupid!), e assim criado menos pastas e arquivos. Porém, como a ideia deste desafio era demonstrar meu conhecimento sobre os princípios de programação, decidi implementar o padrão "Clean Architecture" (de Robert C. Martin, também conhecido como Uncle Bob).

A ideia principal por trás da Clean Architecture é "organizar o código em camadas com responsabilidades bem definidas. As camadas são organizadas com base em seu nível de abstração, onde as camadas mais internas representam a lógica de negócios e as entidades do domínio, e as camadas externas lidam com preocupações específicas da aplicação, infraestrutura e interfaces de usuário" (definição do autor).

Neste projeto, criei a arquitetura com os seguintes diretórios:

**application**: Casos de uso específicos da aplicação e regras de negócio.

**domain**: Lógica central de negócios e entidades do domínio.

**infrastructure**: Serviços externos, persistência de dados e comunicação com o mundo exterior.

<br/>

### **Testes**

No projeto, criei testes para garantir que tudo funcione como deveria. Esses testes verificam diferentes partes, utilizando o Jest para nos ajudar a escrever e executar os testes. Isso nos permite saber se tudo está funcionando bem e torna mais fácil corrigir ou adicionar coisas ao projeto posteriormente.

Nota: **Todos os arquivos typescript neste projeto têm uma cobertura de teste de 80% ou mais** (quase todos com 100%).

<br/>

## Author

Arthur Ferreira Pinto - fepi.arthur@gmail.com
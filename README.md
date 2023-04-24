# Super Test Nodejs

# Executando o projeto

> A versão recomendada para o Node.js é a v18.16.0 e npm 9.6.5

1. Executar `npm install` para instalar as dependências do projeto
2. Criar uma cópia do arquivo `.env.sample` com o nome de `.env`
3. Iniciar o servidor HTTP com o comando `npm run dev` ou `npm start`
4. O serviço será iniciado e acessível no endereço http://127.0.0.1:3000

Caso queira alterar a porta utilizada, é necessário alterar a variável `PORT` no arquivo `.env`

## Testes Unitários

Para executar os testes unitários utilize o comando `npm test` ou `npm run test:watch`

## Exemplos de Requisições

As requisições podem ser realizadas utilizando o Swagger que disponível durante a execução do serviço acessando o endereço http://localhost:3000/docs ou então realizar as chamadas abaixo:

### Criar produto

```sh
curl -X 'POST' \
  'http://localhost:3000/products' \
  -H 'Content-Type: application/json' \
  -d '{
  "sku": 84865,
  "name": "Kit La Roche-Posay Power Hidratação Duo",
  "inventory": {
    "warehouses": [
      {
        "locality": "MOEMA",
        "quantity": 0,
        "type": "PHYSICAL_STORE"
      },
      {
        "locality": "SP",
        "quantity": 2,
        "type": "ECOMMERCE"
      },
      {
        "locality": "PR",
        "quantity": 805,
        "type": "ECOMMERCE"
      }
    ]
  }
}
'
```

### Recuperar Produto

```sh
curl -X 'GET' 'http://localhost:3000/products/84865'
```

### Atualizar Produto

```sh
curl -X 'PUT' \
  'http://localhost:3000/products/84865' \
  -H 'Content-Type: application/json' \
  -d '{
  "sku": 84865,
  "name": "Kit La Roche-Posay Power Hidratação Duo (2 Produtos)",
  "inventory": {
    "warehouses": [
      {
        "locality": "MOEMA",
        "quantity": 10,
        "type": "PHYSICAL_STORE"
      },
      {
        "locality": "SP",
        "quantity": 0,
        "type": "ECOMMERCE"
      },
      {
        "locality": "PR",
        "quantity": 300,
        "type": "ECOMMERCE"
      }
    ]
  }
}
'
```

### Remover Produto

```sh
curl -X 'DELETE' 'http://localhost:3000/products/84865'
```

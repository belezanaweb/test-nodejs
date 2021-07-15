# Deleção de produto por sku
## Use-case
### RF - Requisitos Funcionais
- [x] deve ser possível remover um produto informando sku: url param

### RN - Regras de negócio
- [x] deve ser possível remover um produto cadastrado pelo sku
- [x] não deve ser possível remover um produto com sku inválido(não existente)

## Controller
### Caso de sucesso
- [x] deve receber um request do tipo DELETE na rota /products/:sku
- [x] deve receber um sku como parametro de url
- [x] deve chamar usecase para remover o produto passando o sku
- [x] deve retornar 204
### Exceções
- [x] deve retornar 404 se sku não pertencer a um produto cadastrado
- [x] deve retornar 500 se alguma exceção foi gerada ao tentar remover o produto

# Deleção de produto por sku
## Use-case
### RF - Requisitos Funcionais
- [ ] deve ser possível remover um produto informando sku: url param

### RN - Regras de negócio
- [ ] deve ser possível remover um produto cadastrado pelo sku
- [ ] não deve ser possível remover um produto com sku inválido(não existente)

## Controller
### Caso de sucesso
- [ ] deve receber um request do tipo DELETE na rota /products/:sku
- [ ] deve receber um sku como parametro de url
- [ ] deve chamar usecase para remover o produto passando o sku
- [ ] deve retornar 204
### Exceções
- [ ] deve retornar 404 se sku não pertencer a um produto cadastrado
- [ ] deve retornar 500 se alguma exceção foi gerada ao tentar remover o produto

# Recuperação de produto por sku
## Use-case
### RF - Requisitos Funcionais
- [ ] deve ser possível recuperar um produto informando sku: url param

### RN - Regras de negócio
- [ ] deve ser possível recuperar um produto cadastrado pelo sku
- [ ] não deve ser possível recuperar um produto com sku inválido(não existente)
- [ ] deve ser possível calcular a propriedade inventory.quantity ao recuperar um produto por sku
- [ ] a propriedade inventory.quantity deve ser a soma da quantity dos warehouses 
- [ ] deve ser possível calcular a propriedade isMarketable ao recuperar um produto por sku
- [ ] a propriedade isMarketable deve ser true se inventory.quantity for maior que 0
- [ ] a propriedade isMarketable deve ser false se inventory.quantity for igual a 0


## Controller
### Caso de sucesso
- [ ] deve receber um request do tipo GET na rota /products/:sku
- [ ] deve receber um sku como parametro de url
- [ ] deve chamar usecase para recuperar o produto passando o sku
- [ ] deve retornar 200 com o produto recuperado
### Exceções
- [ ] deve retronar 404 se sku não pertencer a um produto cadastrado
- [ ] deve retornar 500 se alguma exceção foi gerada ao tentar recuperar o produto

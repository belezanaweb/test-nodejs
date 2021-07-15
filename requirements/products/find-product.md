# Recuperação de produto por sku
## Use-case
### RF - Requisitos Funcionais
- [x] deve ser possível recuperar um produto informando sku: url param

### RN - Regras de negócio
- [x] deve ser possível recuperar um produto cadastrado pelo sku
- [x] não deve ser possível recuperar um produto com sku inválido(não existente)
- [x] deve ser possível calcular a propriedade inventory.quantity ao recuperar um produto por sku
- [x] a propriedade inventory.quantity deve ser a soma da quantity dos warehouses 
- [x] deve ser possível calcular a propriedade isMarketable ao recuperar um produto por sku
- [x] a propriedade isMarketable deve ser true se inventory.quantity for maior que 0
- [x] a propriedade isMarketable deve ser false se inventory.quantity for igual a 0


## Controller
### Caso de sucesso
- [x] deve receber um request do tipo GET na rota /products/:sku
- [x] deve receber um sku como parametro de url
- [x] deve chamar usecase para recuperar o produto passando o sku
- [x] deve retornar 200 com o produto recuperado
### Exceções
- [x] deve retronar 404 se sku não pertencer a um produto cadastrado
- [x] deve retornar 500 se alguma exceção foi gerada ao tentar recuperar o produto

# Edição de produto por sku
## Use-case
### RF - Requisitos Funcionais
- [x] deve ser possível editar um produto informando um sku: url param e um payload: sku(integer), name(string), inventory.warehouses[]: locality(string UPPERCASE), quantity(integer), type(string UPPERCASE)

### RN - Regras de negócio
- [x] deve ser possível editar um produto cadastrado pelo sku
- [x] não deve ser possível editar um produto com sku inválido(não existente)


## Controller
### Caso de sucesso
- [x] deve receber um request do tipo PUT na rota /products/:sku
- [x] deve receber um sku como parametro de url
- [x] deve validar payload para edição do produto
- [x] deve chamar usecase para editar o produto passando o payload e o sku
- [x] deve retornar 200 com o produto editado
### Exceções
- [x] deve retornar 400 se payload for inválido
- [x] deve retronar 404 se sku não pertencer a um produto cadastrado
- [x] deve retornar 500 se alguma exceção foi gerada ao tentar editar o produto

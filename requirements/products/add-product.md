# Criação de produto
## Use-case
### RF - Requisitos Funcionais
- [x] deve ser possível cadastrar um produto informando um payload válido: sku(integer), name(string), inventory.warehouses[]: locality(string UPPERCASE), quantity(integer), type(string UPPERCASE)
- [ ] deve enviar locality e type em UPPERCASE para persistência

### RNF - Requisitos Não Funcionais
- [ ] o objeto do produto deve ser salvo em memória

### RN - Regras de negócio
- [x] não deve ser possível cadastrar o produto caso sku já exista em memória 

## Controller
### Caso de sucesso
- [ ] deve receber um request do tipo POST na rota /products
- [ ] deve validar payload
- [x] deve chamar usecase para criar o produto passando o payload
- [x] deve retornar 200 com o produto criado
### Exceções
- [ ] deve retornar 400 se payload for inválido
- [x] deve retornar 400 se sku já cadastrado for informado
- [x] deve retornar 500 se alguma exceção foi gerada ao tentar criar o produto

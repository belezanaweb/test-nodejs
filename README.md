# Teste Boticario - Carlos Alberto Silva Junior

## Comandos para execução do projeto:

* Executar o comando: docker-compose up

Isso fará com que o container do postgres seja criando.

## Instalar o pacote do query builder e executar migration:

- npm install knex@0.95.15 -g

- knex migrate:up

#### Apos executar os comando acima basta utilizar as rotas:

* Exibir unico registro por sku:

http://localhost:3333/index/:sku

* Exbir lista de produtos com mesmo SKU ( Não sera possivel exibir mais de 1 registro devido a regra de negocio da empresa )

http://localhost:3333/:sku

* Inserir um novo registro de produto

http://localhost:3333/newproduct

* Edita um registro utilizando um sku como params na rota

http://localhost:3333/editproduct/:sku

* Deleta um registro utilizando um sku como id

http://localhost:3333/deleteproduct/:sku

-------------------------

Meu github: https://github.com/ZeRoColdma

# Charles Nascimento Moscofian
* email: *charlesmoscofian@hotmail.com*
* contato: (11) 94538-5183


## **Observações**
Para rodar o projeto é necessário:

* instalar as dependências com yarn ou npm:
  ```sh
    yarn
  ```

  ```sh
    npm install
  ```


* Criar os arquivos de variáveis de ambiente (.env dentro da pasta src) para todos os ambientes - vide exemplo abaixo.

* Ter mongoDB (local ou remoto) ou ter docker setado.

## **Variáveis de ambiente customizadas necessárias**
```.env
  MONGODB_URI=mongodb://localhost:27017:example
  PORT=8080
```

* **`MONGODB_URI`** - A URI do mongoDB que será utilizado (*PS: No docker o host deve ser setado para *`mongodb`* e a porta deve ser a padrão *`27017`* ex: *mongodb://mongodb:27017/test*).
* **`PORT`** - A porta que o projeto irá rodar.

Os ambientes disponíveis e seus arquivos de ambiente, devem ser, respectivamente:

1. **`Teste`**
  * Arquivo: `.env.test`
  * Comando: *yarn test* ou *npm test*

2. **`Desenvolvimento local`**
  * Arquivo: `.env.development`
  * Comando: *yarn restart* ou *npm restart*

3. **`Desenvolvimento docker`**
  * Arquivo: `.env.docker`
  * Comando: *docker-compose up --build*

4. **`Produção`**
  * Arquivo: `.env`
  * Comando: *yarn start* ou *npm start*

## **Ferramentas utilizadas**

* **`Typescript`**
* **`MongoDB`** - Conectado utilizando o mongoose.
* **`Jest`** - Testes unitários para todos os endpoints.
* **`Docker`** - Unificar e facilitar o desenvolvimento com data persistente.
* **`Dotenv`** - Para leitura das variáveis de ambiente *custom*.

## **Requisitos**

Crie endpoints para as seguintes ações:

- [X] Criação de produto onde o payload será o json informado acima (exceto as propriedades **isMarketable** e**inventory.quantity**)
- [X] Edição de produto por **sku**
- [X] Recuperação de produto por **sku**
- [X] Deleção de produto por **sku**

### Requisitos


- [X] Toda vez que um produto for recuperado por **sku** deverá ser calculado a propriedade: **inventory.quantity**

        A propriedade inventory.quantity é a soma da quantity dos warehouses

- [X] Toda vez que um produto for recuperado por **sku** deverá ser calculado a propriedade: **isMarketable**

        Um produto é marketable sempre que seu inventory.quantity for maior que 0

- [X] Caso um produto já existente em memória tente ser criado com o mesmo **sku** uma exceção deverá ser lançada

        Dois produtos são considerados iguais se os seus skus forem iguais


- [X] Ao atualizar um produto, o antigo deve ser sobrescrito com o que esta sendo enviado na requisição

        A requisição deve receber o sku e atualizar com o produto que tbm esta vindo na requisição

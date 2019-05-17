### Instalação e inicialização

O desenvolvimento foi realizado no Ubuntu linux versão 18 com vscode e node 10.15.

Recomendo a utilização de docker e docker-compose para subir a aplicação.

Por padrão esta configurada a porta 8080, após inicializar basta acessar em seu navegador o endereço http://localhost:8080.

## Docker
 - Na pasta raiz do projeto basta executar o seguinte comando:
```
docker-compose -f docker/docker-compose.yml up -d
```

## Comando
 - Na pasta raiz do projeto basta executar o seguinte comando:
```
npm run start
```

## Testes unitários
 - Na pasta raiz do projeto basta executar o seguinte comando:
```
npm run test
```

### Arquitetura de desenvolvimento

A aplicação já é compatível com o docker, dessa forma é muito simples configurar recursos como CI/CD.

O design utilizado para construir a aplicação esta separado em três estruturas: integrations, launchers e modules.

 - integrations = Essa camada irá abstrair os recursos de infra estrutura, por exemplo acesso ao banco de dados ou mensageria. Com isso as outras camadas nao conhecem a comunicação específica de cada componente.

 - launcheres = Com o conceito de "monorepo", essa camada é responsável pelo lançamento da aplicação, conforme configuração realizada com as variáveis de ambiente, é possível iniciar a api, um worker ou qualquer outro elemento do aplicativo.

 - modules = trata a regra de negócio em si da aplicação, essa camada poderá utilizar as integrações, porém não irá conhecer a camanda de infra-estrutura.
 É importante que exista um desacoplamento entre os módulos para garantir a reutilização em qualquer outro projeto (definido no launcher).

### Aplicação e desenvolvimento

Basta inicializar a aplicação e acessar o link http://localhost:8080
Você será redirecionado para o swagger onde poderá executar testes para cada api desenvolvida.

Os testes unitários contemplam todas as restrições solicitadas no enunciado da tarefa.


### Backend Test
[![Build Status](https://travis-ci.org/belezanaweb/test-nodejs.svg?branch=master)](https://travis-ci.org/belezanaweb/test-nodejs)

Esta é uma avaliação básica de código.

O objetivo é conhecer um pouco do seu conhecimento/prática de RESTful e NodeJS.

Recomendamos que você não gaste mais do que 4 - 6 horas.

Faça um fork deste repositório.

Ao finalizar o teste, submeta um pull request para o repositório que nosso time será notificado.

### Tarefas

Com a seguinte representação de produto:

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

Crie endpoints para as seguintes ações:

- [X] Criação de produto onde o payload será o json informado acima (exceto as propriedades **isMarketable** e **inventory.quantity**)

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

### Dicas

- Os produtos podem ficar em memória, não é necessário persistir os dados

        Utilizei uma variavel local no controller de produto para registrar.

- Testes são sempre bem-vindos :smiley:

        Realizei três níveis de teste: validação, controller e API. Para executar basta rodar o comando
        ```
        npm run test 
        ```
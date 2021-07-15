### Backend Test
[![Build Status](https://travis-ci.org/belezanaweb/test-nodejs.svg?branch=master)](https://travis-ci.org/belezanaweb/test-nodejs)

# Setup

## Requisitos
- Ter docker e docker-compose instalados no computador. O docker-compose por padrão já vem instalado nos sistemas operacionais windows e macOS. Para o linux é necessário seguir alguns passos adicionais, que podem facilmente serem encontrados ([na documentação do docker-compose](https://docs.docker.com/compose/install/)).
   
- Ter o nodeJS instalado na versão LTS

### Rodando o docker-compose
`docker-compose up -d`

Após estes passos terá um container docker rodando a aplicação no seu computador na porta 3333.

### Rodando via nodeJS
  1. `yarn` para instalar as dependencias
  2. `yarn dev:server` para subir o servidor de testes na sua máquina

# Requirements
- [x] Criação de produto onde o payload será o json informado acima (exceto as propriedades **isMarketable** e **inventory.quantity**)
- [x] Edição de produto por **sku**
- [x] Recuperação de produto por **sku**
- [x] Deleção de produto por **sku**
### Requisitos
- [x] Toda vez que um produto for recuperado por **sku** deverá ser calculado a propriedade: **inventory.quantity**
        A propriedade inventory.quantity é a soma da quantity dos warehouses
- [x] Toda vez que um produto for recuperado por **sku** deverá ser calculado a propriedade: **isMarketable**
        Um produto é marketable sempre que seu inventory.quantity for maior que 0
- [x] Caso um produto já existente em memória tente ser criado com o mesmo **sku** uma exceção deverá ser lançada
        Dois produtos são considerados iguais se os seus skus forem iguais
- [x] Ao atualizar um produto, o antigo deve ser sobrescrito com o que esta sendo enviado na requisição
        A requisição deve receber o sku e atualizar com o produto que tbm esta vindo na requisição

Além disso eu fiz alguns requirements para iniciar o desenvolvimentos que podem ser encontrados abaixo:
### Produtos
1. [Criar](./requirements/products/add-product.md)
2. [Editar](./requirements/products/edit-product.md)
3. [Recuperar](./requirements/products/find-product.md)
4. [Remover](./requirements/products/delete-product.md)

# Arquitetura escolhida
Bom, eu decidi partir para um arquitura em camadas bem desacoplada de qualquer framework. Tomei a liberdade para implementar adaptadores de rota e middleware para o express, mas saliento que a minha desição arquitetural para resolver o problema deve nos dar a possíbiliade de trocar o framework sem muita dor de cabeça. Basta com que implementemos novos adaptadores.

Resolvi partir para uma solução com o domínio um pouco mais anemico, visto que era um problema mais simples, mas mesmo assim deixei-o isolado.

### core
aqui eu criei uma centralização d

### domain
Aqui eu concentrei minhas regras de dominio, criei as interfaces para os use-cases e alguns erros de dominio. Deixei o dominio bem simples e anêmico, mas me esforcei ao máximo para deixá-lo isolado.

### use-cases
Aqui está a regra de negocio da aplicação cada use-case conta com 5 arquivos:
1. UseCase propriamente dito
2. Testes unitários do use-case
3. Controlador do UseCase
4. Testes unitários do Controlador
5. Index file: factory para a criação do controlador

Eu decidi deixar os controllers junto com os use-cases mais por simplificação da estrutura mesmo.

### presentation
Aqui eu centralizei os erros http, alguns helps para http request e alguns protocolos que foram implementados nas outras camadas.

### repositories
Aqui eu concentrei toda a lógica de repositórios, suas interfaces e implementações. Decidi por utilizar o Interface Segregation Principle ao máximo e criei uma interface para cada função do repositório de produtos. Criei apenas uma implementação para todas essas interfaces que é um repositório em memória.
Também pode ser encontrado dentro da pasta de implementações um singleton para consequir utilizar o mesmo repositório em todos os lugares!

### main
Aqui é onde a "mágica" acontece, camada que acopla o sistema a um framework para receber requisicões HTTP, disponibiliza rotas e a criação do servidor. Como disse anteriormente, decidi ir com o express, mas poderiamos substituí-lo por outro framework :) 

# Testes
Tentei cobrir o máximo de código que eu pude, um coverage report pode ser gerado utilizando `yarn test:complete`. A maioria dos testes que escrevi foram testes unitários para as funcionalidades.

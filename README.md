# test-nodejs

## Requisitos
- Node (v18.15.0)
- NPM (v9.5.0)
- NVM (Opcional)

## Instalação

- Certifique-se que você esteja utilizando a versão utilizada pelo projeto do Node e do NPM, seja de forma global ou pelo NVM e execute: `npm i`

## Execucão

- Para evitar a utilização de muitas bibliotecas externas, o projeto está fixado na porta 3000, para iniciar o servidor http, execute: `npm run local:start`

## Testes
- Para executar os testes, execute: `npm test`

## Casos de uso
- Criação de produto
- Edição de produto por sku
- Recuperação de produto por sku
- Deleção de produto por sku

## Collections
Foi exportado para o projeto as collections tanto para o Thunder Client (Extensão HTTP para vscode) quanto para o Postman. Fica ao critério do usuário escolher qual utilizar. Ambas se encontram na raiz do projeto com os seguintes nomes: `collections-postman.json` e `collections-thunder.json`.

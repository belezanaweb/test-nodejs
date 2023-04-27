## Teste Lucas Schlottfeldt

### Código
Este teste foi feito utilizando o framework `NestJS` em sua última versão. O código fonte se encontra na pasta `./desafio`.

Para executar o serviço execute:
```
cd desafio && npm install && npm run dev
```
O servidor é executado na porta 3000.

O serviço expõe os seguintes endpoints:
`-GET /products`
`-GET /products/:sku`
`-POST /products`
`-PATCH /products/:sku`
`-DELETE /products/:sku`

O registro dos arquivos é salvo em um arquivo json no caminho `products_list/list.json`, e sua manipulação é feita utilizando o File System do NodeJs.

### Testes
Os testes unitários foram realizados utilizando o Jest, e estão disponíveis nos arquivos `.spec.ts`.

Obrigado e espero que gostem.

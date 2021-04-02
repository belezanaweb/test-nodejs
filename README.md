### Backend Test
| Ação | Url |
| ------------- | ------------- |
| Retornar Todos  | http://localhost:3000/ |
| Retornar específico | http://localhost:3000/:skuId |
| Criar um sku | http://localhost:3000/create |
| Editar um sku | http://localhost:3000/edit |
| Deletar um sku | http://localhost:3000/delete/skuId |

### Postman
Separei uma collection para facilitar os testes no postman. Ele se encontra na raiz dentro da pasta postman.

### Como rodar o projeto?
Para rodar o projeto faça:

```sh
git clone https://github.com/belezanaweb/test-nodejs
```

```sh
cd test-nodejs
```

```sh
npm run dev
```

### Como rodar os testes?
Basta estar na raiz do projeto e:

```sh
npm t
```
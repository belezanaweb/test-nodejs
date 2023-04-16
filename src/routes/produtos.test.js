const request = require('supertest');
const server = require('../../index');

const produtoMock = require('../../testes/mocks/produtos')

const req = request(server);

describe('Rotas de produtos - Sucesso', () => {
    it('Criar um produto', async () => {
        const resp = await req
            .post('/produto')
            .send(produtoMock.PRODUTO_CRIAR_SUCESSO);
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual(produtoMock.PRODUTO_CRIAR_SUCESSO);
    });

    it('Editar um produto', async () => {
        const resp = await req
            .put('/produto/' + produtoMock.SKU_SUCESSO)
            .send(produtoMock.PRODUTO_EDITAR_SUCESSO);
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual(produtoMock.PRODUTO_EDITAR_SUCESSO);
    });

    it('Recuperar um produto', async () => {
        const resp = await req
            .get('/produto/' + produtoMock.SKU_SUCESSO);
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual(produtoMock.PRODUTO_RECUPERAR_SUCESSO);
    });

    it('Recuperar um produto - Sem Estoque', async () => {
        await req
            .post('/produto')
            .send(produtoMock.PRODUTO_SEMESTOQUE);
        const resp = await req
            .get('/produto/' + produtoMock.SKU_SEMESTOQUE);
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual(produtoMock.PRODUTO_RECUPERAR_SEMESTOQUE);
    });

    it('Deletar um produto', async () => {
        const resp = await req
            .delete('/produto/' + produtoMock.SKU_SUCESSO);
        expect(resp.statusCode).toEqual(200);
    });
});

describe('Rotas de produtos - Erros', () => {
    it('Criar um produto - Produto já existe', async () => {
        await req
            .post('/produto')
            .send(produtoMock.PRODUTO_CRIAR_SUCESSO);
        const resp = await req
            .post('/produto')
            .send(produtoMock.PRODUTO_CRIAR_SUCESSO);
        expect(resp.statusCode).toEqual(406);
    });

    it('Criar um produto - Paylaod inválido', async () => {
        const resp = await req
            .post('/produto')
            .send(produtoMock.PRODUTO_CRIAR_INVALIDO);
        expect(resp.statusCode).toEqual(406);
    });

    it('Editar um produto - Produto já existe', async () => {
        const resp = await req
            .put('/produto/' + produtoMock.SKU_INEXISTE)
            .send(produtoMock.PRODUTO_CRIAR_SUCESSO);
        expect(resp.statusCode).toEqual(406);
    });

    it('Recuperar um produto - Produto já existe', async () => {
        const resp = await req
            .get('/produto/' + produtoMock.SKU_INEXISTE);
        expect(resp.statusCode).toEqual(406);
    });

    it('Deletar um produto - Produto já existe', async () => {
        const resp = await req
            .delete('/produto/' + produtoMock.SKU_INEXISTE);
        expect(resp.statusCode).toEqual(406);
    });
});
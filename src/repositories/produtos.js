class ProdutosRepository {
    constructor() {
        this._produtos = [];
    }

    criar(produto) {
        this._produtos.push(produto);
        return produto;
    }

    recuperarPorSku(sku) {
        return this._produtos.find(p => p.sku === sku);
    }

    editar(produto) {
        const index = this._produtos.findIndex(e => e.sku === produto.sku);
        const atualizado = Object.assign(this._produtos[index], produto);

        this._produtos[index] = atualizado;

        return atualizado;
    }

    deletar(sku) {
        const index = this._produtos.findIndex(e => e.sku === sku);

        this._produtos.splice(index, 1);
    }
}

module.exports = ProdutosRepository;
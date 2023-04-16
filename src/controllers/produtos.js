const ProdutosService = require('../services/produtos');

class ProdutosController {
    constructor(repository) {
        this.service = new ProdutosService(repository);
    }

    criarProduto(payload) {
        try{
            return this.service.criarProduto(payload);
        }
        catch(e) {
            throw(e);
        }
    }

    editarProduto(sku, payload) {
        try{
            return this.service.editarProduto(sku, payload);
        }
        catch(e) {
            throw(e);
        }
    }

    recuperarProduto(sku, payload) {
        try{
            return this.service.recuperarProduto(sku);
        }
        catch(e) {
            throw(e);
        }
    }

    deletarProduto(sku, payload) {
        try{
            this.service.deletarProduto(sku);
        }
        catch(e) {
            throw(e);
        }
    }
}

module.exports = ProdutosController;
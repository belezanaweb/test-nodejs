const ProdutoModel = require('../models/produtoModel');

module.exports.cadastrar = async (produto) => {
    try {

        const novoProduto = await ProdutoModel.create(produto);
        return novoProduto;

    } catch (error) {

        return error;
    }
};

module.exports.atualizar = async (sku, produto) => {
    try {

        const produtoAtualizado = await ProdutoModel.findOneAndUpdate({ sku: sku }, {
            name: produto.name,
            inventory: produto.warehouses
        });

        return produtoAtualizado;
    } catch (error) {
        return error;
    }
};

module.exports.atualizarisMarketable = async (sku, isMarketable) => {
    try {

        const produtoAtualizado = await ProdutoModel.findOneAndUpdate({ sku: sku }, (err, isMarketable) => {
            if(err) {
                return 'Erro ao buscar Produto'
            }

            produto.isMarketable = isMarketable;

            produto.save(function (err, produto) {
                if (err) return err;
            });
        });

        return produtoAtualizado;
    } catch (error) {
        return error;
    }
};

module.exports.atualizarInventoryQuantity = async (sku, quantity) => {
    try {

        const produtoAtualizado = await ProdutoModel.findOneAndUpdate({ sku: sku }, (err, produto) => {
            if(err) {
                return 'Erro ao buscar Produto'
            }

            produto.inventory.quantity = quantity;

            produto.save(function (err, produto) {
                if (err) return err;
            });
        });

        return produtoAtualizado;
    } catch (error) {
        return error;
    }
};

module.exports.listarProduto = async (sku) => {
    try {

        const produtoNaBase = await ProdutoModel.findOne({ sku: sku });

        return produtoNaBase;

    } catch (error) {
        return error;
    }
};

module.exports.remover = async (sku) => {
    try {

        const produtoDeletado = await ProdutoModel.remove({ sku: sku});

        return produtoDeletado;

    } catch (error) {
        return error;
    }
};
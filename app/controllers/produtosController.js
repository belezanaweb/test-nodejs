const ProdutosRepo = require('../dataBaseMongo/repositorio/produtosRepo');

module.exports.cadastrarProdutos = async (req, res) => {
    try {
        const produto = req.body;
        const produtoNovo = await ProdutosRepo.cadastrar(produto);
        res.status(200).json({ novoProduto: produtoNovo });

    } catch (error) {
        res.status(500).send(error);
    };
};

module.exports.atualizarProdutos = async (req, res) => {
    try {
        const { sku } = req.params;
        const produto = req.body;
        const produtoAtualizado = await ProdutosRepo.atualizar(sku, produto);
        res.status(200).json({ produtoAtualizado: produtoAtualizado });

    } catch (error) {
        res.status(500).send(error);
    };
};

module.exports.mostrarProduto = async (req, res) => {
    try {
        const { sku } = req.params;

        let produtoNaBase;

        produtoNaBase = await ProdutosRepo.listarProduto(sku);

        let inventario = produtoNaBase.inventory.warehouses;

        let quantityAll = inventario.map(item => item.quantity);

        let inventarioQuantity = quantityAll.reduce((cont, linha) => cont + linha, 0).toFixed(2);

        const isMarketable = inventarioQuantity > 0 ? true : false;

        await ProdutosRepo.atualizarisMarketable(sku, isMarketable);

        await ProdutosRepo.atualizarInventoryQuantity(sku, inventarioQuantity);

        produtoNaBase = await ProdutosRepo.listarProduto(sku);

        res.status(200).json({ produto: produtoNaBase });
        
    } catch (error) {
        res.status(500).send(error);
    };
};

module.exports.removerProdutos = async (req, res) => {
    try {
        const { sku } = req.params;
        const produtoDeletado = await ProdutosRepo.remover(sku);
        res.status(200).json({ produtoDeletado: produtoDeletado });

    } catch (error) {
        res.status(500).send(error);
    };
};
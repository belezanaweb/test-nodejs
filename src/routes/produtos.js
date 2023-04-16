const express = require('express');
const ProdutosRepository = require('../repositories/produtos');
const ProdutosController = require('../controllers/produtos');

const router = express.Router();
const controller = new ProdutosController(new ProdutosRepository());

// POST - Criar produto
router.post('/', async (req, res) => {
    try {
        const payload = req.body;
        const resultado = controller.criarProduto(payload);
        res.send(resultado);
    }
    catch (e) {
        res.status(e.status).send({ error: e.error });
    }
});

// PUT - Editar o produto por SKU
router.put('/:sku', async (req, res) => {
    try {
        const sku = req.params.sku;
        const payload = req.body;
        const resultado = controller.editarProduto(sku, payload);
        res.send(resultado);
    }
    catch (e) {
        res.status(e.status).send({ error: e.error });
    }
});

// GET - Recuperar produto por SKU
router.get('/:sku', async (req, res) => {
    try {
        const sku = req.params.sku;
        const resultado = controller.recuperarProduto(sku);
        res.send(resultado);
    }
    catch (e) {
        res.status(e.status).send({ error: e.error });
    }
});

// DELETE - Deletar produto por SKU
router.delete('/:sku', async (req, res) => {
    try {
        const sku = req.params.sku;
        controller.deletarProduto(sku);
        res.send('Sucesso');
    }
    catch (e) {
        res.status(e.status).send({ error: e.error });
    }
});

module.exports = app => app.use('/produto', router);
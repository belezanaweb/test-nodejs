import express from 'express';

import ProdutoController from '../controllers/ProdutoController';
const SchemaValidation = require('../middlewares/SchemaValidation');

const router = express.Router();
const produtoController = new ProdutoController();

/**
 * Rotas da api, chamando respectivo controller e metodo;
 */
router.use('/produtos')
.get('/', produtoController.index)
.get('/:sku', produtoController.read)
.post(SchemaValidation(true),produtoController.create)
.put(SchemaValidation(true), produtoController.update)
.delete('/:sku', produtoController.delete);

export default router;
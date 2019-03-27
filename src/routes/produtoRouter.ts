const express = require('express');

import ProdutoController from '../controllers/ProdutoController';
import ProdutoSchema from '../validations/ProdutoSchema';
const expressJoi = require('express-joi-validator')

const _router = express.Router();
const produtoController = new ProdutoController();
/**
 * Rotas da api, chamando respectivo controller e metodo;
 */
_router
 .route('/produto')
 .get(produtoController.index)
 .post(expressJoi(ProdutoSchema.POST), produtoController.create);

 _router.route('/produto/:sku')
 .get(expressJoi(ProdutoSchema.GET),produtoController.read)
 .put(expressJoi(ProdutoSchema.PUT),produtoController.update)
 .delete(expressJoi(ProdutoSchema.DELETE), produtoController.delete);

 


module.exports = _router;
const express = require('express');

import ProductController from '../controllers/ProductController';
import ProductSchema from '../validations/ProductSchema';
const expressJoi = require('express-joi-validator')

const _router = express.Router();
const produtoController = new ProductController();
/**
 * Rotas da api, chamando respectivo controller e metodo;
 */
_router
 .route('/produto')
 .post(expressJoi(ProductSchema.POST), produtoController.create);

 _router
 .route('/produto/:sku')
 .get(expressJoi(ProductSchema.GET),produtoController.read)
 .put(expressJoi(ProductSchema.PUT),produtoController.update)
 .delete(expressJoi(ProductSchema.DELETE), produtoController.delete);

 


module.exports = _router;
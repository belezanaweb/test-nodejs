const express = require('express');

const productController = require('../controller/productController');

const routes = new express.Router();

routes.get('/products/:sku', productController.getBySku);
routes.post('/products', productController.post);
routes.put('/products/:sku', productController.put);
routes.delete('/products/:sku', productController.delete);

module.exports = routes;

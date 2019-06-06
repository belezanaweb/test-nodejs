const express = require('express');
const routes = express.Router();

const product = require('../controllers/products');

// routes product
routes.get('/product/:sku?', product.getProduct);
routes.post('/product/create', product.createProduct);
routes.put('/product/update/:sku?', product.updateProduct);
routes.delete('/product/delete/:sku?', product.deleteProduct);

module.exports = routes;
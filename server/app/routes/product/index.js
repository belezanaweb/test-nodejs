const express = require('express');
const productController = absoluteRequire('controllers/product');
const {
	Router
} = express;

const route = Router();

route.get('/product', productController.getProducts);

module.exports = route;

const express = require('express');
const {
	getProducts,
	postProduct,
	getProductBySku,
	deleteProductBySku,
	putProduct
} = absoluteRequire('controllers/product');
const {
	contactValidator
} = absoluteRequire('validators/product');

const {
	Router
} = express;

const route = Router();

route.post('/product', contactValidator({
	uniqueSku: true
}), postProduct);
route.put('/product', contactValidator({
	uniqueSku: false
}), putProduct);
route.get('/product', getProducts);
route.get('/product/:sku', getProductBySku);
route.delete('/product/:sku', deleteProductBySku);

module.exports = route;

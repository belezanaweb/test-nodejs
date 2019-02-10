const express = require('express');
const {
	getProducts,
	postProduct,
	getProductBySku,
	deleteProductBySku,
	putProduct
} = absoluteRequire('controllers/product');
const {
	postContactValidator,
	putContactValidator
} = absoluteRequire('validators/product');
const {
	Router
} = express;

const route = Router();

route.post('/product', postContactValidator(), postProduct);
route.put('/product', putContactValidator(), putProduct);
route.get('/product', getProducts);
route.get('/product/:sku', getProductBySku);
route.delete('/product/:sku', deleteProductBySku);

module.exports = route;

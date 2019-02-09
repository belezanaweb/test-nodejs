const express = require('express');
const {
	getProducts,
	postProduct
} = absoluteRequire('controllers/product');
const {
	addContactValidator
} = absoluteRequire('validators/product');
const {
	Router
} = express;

const route = Router();

route.get('/product', getProducts);
route.post('/product', addContactValidator(), postProduct);

module.exports = route;

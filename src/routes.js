const { Router } = require('express');

const ProductController = require('./controller/ProductController');
const checksExistsProduct = require('./utils/checksExistsProduct')
const routes = Router();

routes.get('/products/:sku',checksExistsProduct, ProductController.index);
routes.post('/products', ProductController.store);
routes.put('/products/:sku', checksExistsProduct, ProductController.update);
routes.delete('/products/:sku', checksExistsProduct, ProductController.destroy);

module.exports = routes; 

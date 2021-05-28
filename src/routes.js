const routes = require("express").Router();

const ProductsAPI = require("./controllers/ProductsAPIController");

routes
    .post('/product', ProductsAPI.createProduct)
    .put('/product/update', ProductsAPI.updateProductBySku)
    .get('/product/:sku', ProductsAPI.getProductBySku)
    .delete('/product/:sku', ProductsAPI.deleteProductBySku)


module.exports = routes;
const routes = require("express").Router();

const ProductsAPI = require("./controllers/ProductsAPIController");

routes
    .post('/product', ProductsAPI.createBySku)
    //.put('/product/update', ProductsAPI.updateProductBySku)
    .get('/product/:sku', ProductsAPI.getBySku)
    //.delete('/product/:sku', ProductsAPI.deleteProductBySku)


module.exports = routes;
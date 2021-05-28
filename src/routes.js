const routes = require("express").Router();

const ProductsAPI = require("./controllers/ProductsAPIController");

routes
    .post('/product', ProductsAPI.createBySku)
    .put('/product/update', ProductsAPI.updateBySku)
    .get('/product/:sku', ProductsAPI.getBySku)
    .delete('/product/:sku', ProductsAPI.deleteBySku)


module.exports = routes;
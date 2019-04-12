const express = require('express');
const product = require('../controllers/product.js');
const router = new express.Router();


router.route('/product/:sku?')
    .get(product.get)
    .post(product.post)
    .put(product.put)
    .delete(product.delete);


module.exports = router;
const router = require('express').Router();
const controller = require('./controllers/index');

router.post('/product', controller.createProduct);
router.get('/product/:sku', controller.getProductBySku);
router.patch('/product/:sku', controller.updateProductBySku);
router.delete('/product/:sku', controller.deleteProductBySku);

module.exports = router;

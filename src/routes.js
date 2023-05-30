const router = require('express').Router();
const controller = require('./controllers/index');

router.post('/product', controller.CreateProduct);
router.get('/product/:sku', controller.GetProductBySku);
router.patch('/product/:sku', controller.UpdateProductBySku);
router.delete('/product/:sku', controller.DeleteProductBySku);




module.exports = router;

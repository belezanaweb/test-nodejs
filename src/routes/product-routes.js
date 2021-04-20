const router = require('express').Router();
const resp = require('../utils/response');

const ProductsController = require('../controllers/product-controller');

router.post('/', (req, res) => {
    try {
        let data = req.body;
        let result = ProductsController.create(data);

        resp.sendCreated(res, "Product created", result);
    } catch(err) {
        resp.sendError(res, "Error on create product", err);
    }
});


router.get('/:sku', (req, res) => {
    try {
        let sku = Number(req.params.sku);
        let result = ProductsController.getOne(sku);

        resp.sendSuccess(res, "Product founded", result);
    } catch(err) {
        resp.sendError(res, "Error on get product", err);
    }
});

router.put('/:sku', (req, res) => {
    try {
        let sku = Number(req.params.sku);
        let data = req.body;
        let result = ProductsController.update(sku, data);

        resp.sendSuccess(res, "Product updated", result);
    } catch(err) {
        resp.sendError(res, "Error on update product", err);
    }
});

router.delete('/:sku', (req, res) => {
    try {
        let sku = Number(req.params.sku);
        let result = ProductsController.delete(sku);

        resp.sendSuccess(res, "Product deleted", result);
    } catch(err) {
        resp.sendError(res, "Error on delete product", err);
    }
});

module.exports = router;
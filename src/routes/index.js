const express = require('express');
const ProductCreate = require("../business/actions/product/product-create");
const ProductDelete = require("../business/actions/product/product-delete");
const ProductUpdate = require("../business/actions/product/product-update");
const ProductRecover = require("../business/actions/product/product-recover");

const router = express.Router();

router.get('/:sku', async (req, res) => {
  try {
    const sku = parseInt(req.params.sku);
    res.json(await (new ProductRecover()).do(sku));
    return;
  } catch (error) {
    res.status(error.status).json(error.message).end();
  }
});

router.post('/', async (req, res) => {
  try {
    res.json(await (new ProductCreate()).do(req.body));
  } catch (error) {
    res.status(error.status).json(error.message).end();
  }
});

router.put('/:sku', async (req, res) => {
  try {
    const sku = parseInt(req.params.sku);
    res.json(await (new ProductUpdate()).do(sku, req.body))
  } catch (error) {
    res.status(error.status).json(error.message).end();
  }
});

router.delete('/:sku', async (req, res) => {
  try {
    const sku = parseInt(req.params.sku);
    res.json(await (new ProductDelete()).do(sku));
    return;
  } catch (error) {
    res.status(error.status).json(error.message).end();
  }
});

module.exports = router;

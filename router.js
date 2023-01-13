const express = require("express");

const ProductController = require("./src/controllers/product");
const ProductValidators = require("./src/validators/product");

const router = express.Router();

router.post(
  "/product",
  ProductValidators.createRules,
  ProductValidators.checkRules,
  ProductController.create
);

router.put(
  "/product/:sku",
  ProductValidators.updateRules,
  ProductValidators.checkRules,
  ProductController.update
);

router.get(
  "/product/:sku",
  ProductValidators.skuRule,
  ProductValidators.checkRules,
  ProductController.get
);

router.delete(
  "/product/:sku",
  ProductValidators.skuRule,
  ProductValidators.checkRules,
  ProductController.delete
);

module.exports = router;

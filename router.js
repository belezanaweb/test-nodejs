const express = require("express");

const ProductsController = require("./src/Controllers/Products/ProductsController");

const router = express.Router();

router.get("/index/:sku", ProductsController.index);
router.get("/:sku", ProductsController.sumTotalQuantity);
router.post("/newproduct", ProductsController.store);
router.put("/editproduct/:sku", ProductsController.update);
router.delete("/deleteproduct/:sku", ProductsController.delete);

module.exports = router;

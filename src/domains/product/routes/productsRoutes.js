const { Router } = require("express");
const ProductController = require("../controllers/ProductController");
const productController = new ProductController();

const productsRoutes = Router();

productsRoutes.get("/", (...params) => productController.get(...params));

productsRoutes.get("/:sku", (...params) => productController.getBySku(...params));

productsRoutes.post("/", (...params) => productController.create(...params));

productsRoutes.put("/:sku", (...params) => productController.update(...params));

productsRoutes.delete("/:sku", (...params) => productController.delete(...params));

module.exports = productsRoutes;

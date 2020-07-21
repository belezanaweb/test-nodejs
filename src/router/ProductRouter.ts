const express = require("express");
import { ProductController } from "../controller/ProductController";

export const productRouter = express.Router();

const productController = new ProductController();

productRouter.post("/new-product", productController.createProduct);

productRouter.get("/products", productController.getAllProducts);
productRouter.get("/:sku", productController.getProductBySku);


productRouter.put("/:sku", productController.updateProduct);

productRouter.delete("/:sku", productController.deleteProduct);
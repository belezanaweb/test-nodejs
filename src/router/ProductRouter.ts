import express from "express"
import { ProductController } from "../controller/ProductController";

export const productRouter = express.Router();

const productController = new ProductController();

productRouter.post("/create", productController.createProduct)
productRouter.get("/:sku", productController.getProductBySku)
productRouter.put("/:sku", productController.editProduct)
productRouter.delete("/:sku", productController.deleteProduct)
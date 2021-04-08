import express from "express";
import { ProductController } from "../ProductController";

export const productRouter = express.Router()

const productController = new ProductController()

productRouter.post("/create", productController.createProduct)
productRouter.put("/update/:sku", productController.updateProduct)
productRouter.delete("/delete/:sku", productController.deleteProduct)
productRouter.get("/:sku", productController.getProductBySku)


import express from "express";
import { ProductController } from "../controller/ProductController";

export const productRouter = express.Router()

const productController = new ProductController()

productRouter.post("/create", productController.createProduct)
productRouter.delete("/delete/:sku", productController.deleteProduct)
productRouter.get("/:sku", productController.getProductBySku)


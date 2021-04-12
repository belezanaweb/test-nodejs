import express from "express"
import { ProductController } from "../controller/ProductController"

export const productRouter = express.Router()

productRouter.post("/", new ProductController().createProduct)
productRouter.put("/:sku", new ProductController().editProduct)
productRouter.get("/:sku", new ProductController().getProduct)
productRouter.delete("/:sku", new ProductController().deleteProduct)
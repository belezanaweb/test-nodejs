import express from "express";
import { ProductController } from "../controller/ProductController";

export const productRouter = express.Router();

productRouter.post("/", new ProductController().createProduct);
productRouter.post("/:sku", new ProductController().editProductBySku);
productRouter.get("/:sku", new ProductController().getProductBySku);
productRouter.delete("/:sku", new ProductController().deleteProductBySku);
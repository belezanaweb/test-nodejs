import express from "express";
import ProductController from "../controller/ProductController";

export const productRouter = express.Router();

productRouter.post("/post", ProductController.createProduct);
productRouter.put("/:id", ProductController.editProductBySku);
productRouter.get("/:id", ProductController.getProductBySku);
productRouter.delete("/:id", ProductController.delProductBySku);
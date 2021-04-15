import express from "express";
import ProductController from "../controller/ProductController";

export const productRouter = express.Router();

productRouter.post("/post", ProductController.createProduct);
// productRouter.put("/:id", ProductController.editProductById);
// productRouter.get("/all", productController.getAllProducts);
// productRouter.delete("/:id", productController.delProductById);
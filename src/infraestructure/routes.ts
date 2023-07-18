import { Router } from "express";
import ProductController from "../interfaces/ProductController";

const routerProduct = (productController: ProductController): Router => {
  const router = Router();

  router.post("/", (req, res) => {
    productController.create(req, res);
  });

  router.put("/:sku", (req, res) => {
    productController.update(req, res);
  });

  router.get("/:sku", (req, res) => {
    productController.get(req, res);
  });

  return router;
};

export default routerProduct;

import { Router } from "express";

import { ProductsController } from "@modules/products/Products.controller";
import {
  CreateProductsValidator,
  UpdateProductsValidator,
} from "@modules/products/validators";
import { validator } from "@shared/middleware/validator";

const productsRoutes = Router();

const productsController = new ProductsController();

productsRoutes.get("/", productsController.get);
productsRoutes.get("/:id", productsController.getOne);
productsRoutes.post(
  "/",
  CreateProductsValidator(),
  validator,
  productsController.create
);
productsRoutes.put(
  "/:id",
  UpdateProductsValidator(),
  validator,
  productsController.put
);
productsRoutes.delete("/:id", productsController.delete);

export { productsRoutes };

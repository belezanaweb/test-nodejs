import express from "express";
import { routerProduct } from "./implementations/products/product-create.router";
import { routerDocAPI } from "./implementations/docs/docs.router";
import { routerProductUpdate } from "./implementations/products/product-update.router";
import { routerProductFind } from "./implementations/products/product-find.router";
import { routerProductGet } from "./implementations/products/product-get.router";
import { routerProductDelete } from "./implementations/products/product-delete.router";

const router = express.Router();

const listRoutes = [
  routerProduct,
  routerProductUpdate,
  routerProductFind,
  routerProductGet,
  routerProductDelete,
  routerDocAPI
];

router.use('/api/', listRoutes);

export { router };

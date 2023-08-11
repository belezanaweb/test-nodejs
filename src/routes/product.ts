import { Router } from "express";
import {
  createController,
  findAllController,
  findBySkuController,
  updateController,
  removeController,
} from "../controllers/product";
import { Schema } from "../schemas/product";

const routes = Router();

routes.post("/", Schema.create, createController);
routes.get("/", findAllController);
routes.get("/:sku", Schema.bySku, findBySkuController);
routes.put("/:sku", Schema.bySku, Schema.update, updateController);
routes.delete("/:sku", Schema.bySku, removeController);

export default routes;

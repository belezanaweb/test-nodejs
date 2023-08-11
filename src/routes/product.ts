import { Router } from "express";
import {
  createController,
  findAllController,
  findBySkuController,
  updateController,
  removeController,
} from "../controllers/product";

const routes = Router();

routes.post("/", createController);
routes.get("/", findAllController);
routes.get("/:sku", findBySkuController);
routes.put("/:sku", updateController);
routes.delete("/:sku", removeController);

export default routes;

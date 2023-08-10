import { Router } from "express";
import {
  createController,
  findAllController,
  findBySkuController,
} from "../controllers/product";

const routes = Router();

routes.post("/", createController);
routes.get("/", findAllController);
routes.get("/:sku", findBySkuController);

export default routes;

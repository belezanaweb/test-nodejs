import { Router } from "express";
import middleware from "../middlewares/joiMiddleware.js";
import { create, del, update, get } from "../controllers/productsController.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/productsSchema.js";

const router = Router();

router.post("", middleware(createProductSchema, "body"), create);
router.put("/:productSku", middleware(updateProductSchema, "body"), update);
router.get("/:productSku", get);
router.delete("/:productSku", del);

export default router;

/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as ProductController from "./product.controller";

/**
 * Router Definition
 */

export const productsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET product

productsRouter.get("/", ProductController.getAll);

// GET product/:id

productsRouter.get("/:sku", ProductController.getById);

// POST product

productsRouter.post("/", ProductController.create);

// PUT product/:id

productsRouter.put("/:sku", ProductController.update);

// DELETE product/:id

productsRouter.delete("/:sku", ProductController.remove);

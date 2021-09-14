import express, { Request, Response } from "express";
import { productDeleteController } from "../../../../../app/product/delete";

const routerProductDelete = express.Router();

routerProductDelete.delete('/product/:sku', async (req: Request, resp: Response) => {
  const { sku } = req.params;
  const response = await productDeleteController.handle(parseInt(sku));
  resp.status(response.code).send({
    message: response.message
  });
});

export { routerProductDelete }

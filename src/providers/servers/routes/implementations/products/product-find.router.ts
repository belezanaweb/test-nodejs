import express, { Request, Response } from "express";
import { productFindController } from "../../../../../app/product/find";

const routerProductFind = express.Router();

routerProductFind.get('/product/:sku', async (req: Request, resp: Response) => {
  const { sku } = req.params;
  const response = await productFindController.handle(parseInt(sku));
  resp.status(response.code).send(response.data);
});

export { routerProductFind }

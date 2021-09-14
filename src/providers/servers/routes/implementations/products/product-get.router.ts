import express, { Request, Response } from "express";
import { productGetController } from "../../../../../app/product/get";

const routerProductGet = express.Router();

routerProductGet.get('/products', async (req: Request, resp: Response) => {
  const response = await productGetController.handle();
  resp.status(response.code).send(response.data);
});

export { routerProductGet }

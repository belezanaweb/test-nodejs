import express, { Request, Response } from "express";
import { productCreateController } from "../../../../../app/product/create";
import { validateRequest } from "../../../../../utils/validate-request.util";

const routerProduct = express.Router();

routerProduct.post('/product', async (req: Request, resp: Response) => {
  await validate(req.body);
  const response = await productCreateController.handle(req.body);
  resp.status(response.code).send({
    message: response.message
  });
});

/**
 * Validate Request
 * @param body
 */
const validate = async (body: any) => {
  await validateRequest(body, {
    sku: 'required|integer|min:1',
    name: 'required|string|maxLength:255',
    inventory: 'required|object',
    'inventory.warehouses': 'required|array',
    'inventory.warehouses.*.locality': 'required|string',
    'inventory.warehouses.*.quantity': 'required|integer|min:0',
    'inventory.warehouses.*.type': 'required|in:ECOMMERCE,PHYSICAL_STORE',
  });
}

export { routerProduct };

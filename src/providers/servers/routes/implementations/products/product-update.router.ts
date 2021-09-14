import express, { Request, Response } from "express";
import { productUpdateController } from "../../../../../app/product/update";
import { validateRequest } from "../../../../../utils/validate-request.util";

const routerProductUpdate = express.Router();

routerProductUpdate.put('/product/:sku', async (req: Request, resp: Response) => {
  const { sku } = req.params;
  await validate(req.body);
  const response = await productUpdateController.handle(parseInt(sku), req.body);
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

export { routerProductUpdate };

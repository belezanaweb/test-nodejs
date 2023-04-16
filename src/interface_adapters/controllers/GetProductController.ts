import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { StatusCodes } from 'http-status-codes';
import GetProduct from "src/application/use_cases/GetProduct";


export default class GetProductController {
  private getProduct: GetProduct;

  constructor({ getProduct }: { getProduct: GetProduct }) {
    this.getProduct = getProduct;
  }

  async handle(req: Request, res: Response) {
    try {
      const sku = z.string()
        .transform(Number)
        .refine((sku) => !Number.isNaN(sku), { message: "SKU must be integer" })
        .parse(req.params.sku);
      const product = await this.getProduct.execute({ sku });
      res.json(product);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: error.format()
        });
      }
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something happened!"
      })
    }
  }
}

import { Request, Response } from "express";
import { ZodError } from "zod";
import { StatusCodes } from 'http-status-codes';
import CreateProduct from "src/application/use_cases/CreateProduct";
import { ProductDTOSchema } from "src/application/use_cases/DTO/ProductDTO";
import ProductAlreadyExistsException from "src/domain/exceptions/ProductAlreadyExistsException";

export default class CreateProductController {
  private createProduct: CreateProduct;

  constructor({ createProduct }: { createProduct: CreateProduct }) {
    this.createProduct = createProduct;
  }

  async handle(req: Request, res: Response) {
    try {
      const createProduct = ProductDTOSchema.parse(req.body);
      const product = await this.createProduct.execute(createProduct);
      res.json(product);
    } catch (error) {
      if (error instanceof ProductAlreadyExistsException) {
        res.status(StatusCodes.BAD_REQUEST)
          .json({
            message: "Dois produtos são considerados iguais se os seus skus forem iguais"
          })
        return
      }
      if (error instanceof ZodError) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: error.format()
        });
      }
    }
  }
}

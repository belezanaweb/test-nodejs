import { Request, Response } from "express";
import { ZodError } from "zod";
import { StatusCodes } from 'http-status-codes';
import UpdateProduct from "src/application/use_cases/UpdateProduct";
import { ProductDTOSchema } from "src/application/use_cases/DTO/ProductDTO";
import ProductAlreadyExistsException from "src/domain/exceptions/ProductAlreadyExistsException";
import ProductNotFoundWhileUpdatingException from "src/domain/exceptions/ProductNotFoundWhileUpdatingException";

export default class UpdateProductController {
  private updateProduct: UpdateProduct;

  constructor({ updateProduct }: { updateProduct: UpdateProduct }) {
    this.updateProduct = updateProduct;
  }

  async handle(req: Request, res: Response) {
    try {
      const updateProduct = ProductDTOSchema.parse(req.body);
      const product = await this.updateProduct.execute(updateProduct);
      res.json(product);
    } catch (error) {
      if (error instanceof ProductAlreadyExistsException) {
        res.status(StatusCodes.BAD_REQUEST)
          .json({
            message: "Dois produtos são considerados iguais se os seus skus forem iguais"
          })
        return
      }
      if (error instanceof ProductNotFoundWhileUpdatingException) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "sku não encontrado"
        })
      }
      if (error instanceof ZodError) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: error.format()
        });
      }
    }
  }
}

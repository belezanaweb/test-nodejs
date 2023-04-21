import { Request, Response } from "express";
import { container } from "tsyringe"
import { UpdateProcuctUseCase } from "./UpdateProduct.useCase";
import { AppError } from "../../../../shared/excepetions/errors";

export class UpdateProductController {
  constructor() { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { sku } = request.params
      const data = request.body
      
      const updateProductUseCase = container.resolve(UpdateProcuctUseCase)
      const updatedProduct = await updateProductUseCase.execute(
        +sku,
        data
      )

      return response.status(200).json(updatedProduct)
    } catch (error: any) {
      throw new AppError(error.message || 'Error on update product by sku')
    }
  }
}
import { Request, Response } from "express";
import { container } from "tsyringe"
import { DeleteProcuctUseCase } from "./DeleteProduct.useCase";
import { AppError } from "../../../../shared/excepetions/errors";

export class DeleteProductController {
  constructor() { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { sku } = request.params
      const deleteProductUseCase = container.resolve(DeleteProcuctUseCase)
      await deleteProductUseCase.execute(
        +sku
      )

      return response.status(200).json({success: true})
    } catch (error: any) {
      throw new AppError(error.message || 'Error on delete product')
    }
  }
}
import { Request, Response } from "express";
import { container } from "tsyringe"
import { GetProductUseCase } from "./GetProduct.useCase";
import { AppError } from "../../../../shared/excepetions/errors";

export class GetProductController {
  constructor() { }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { sku } = request.params
      
      const getProductUseCase = container.resolve(GetProductUseCase)
      const getProduct = await getProductUseCase.execute(
        +sku
      )

      return response.status(200).json(getProduct)
    } catch (error: any) {
      throw new AppError(error.message || 'Error on finding product by sku')
    }
  }
}
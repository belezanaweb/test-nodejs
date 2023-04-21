import { Request, Response } from "express";
import { CreateProductUseCase } from './CreateProduct.useCase';
import { container } from "tsyringe"
import { AppError } from "../../../../shared/excepetions/errors";

export class CreateProductController {
  constructor() { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { sku, name, inventory } = request.body
    try {
      const createProductUseCase = container.resolve(CreateProductUseCase)
      await createProductUseCase.execute({
        sku,
        name,
        inventory
      })

      return response.status(201).send()
    } catch (error: any) {
      throw new AppError(error.message || 'Unexpected error on create product')
    }
  }
}
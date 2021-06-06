import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductsService from '@modules/products/services/CreateProductService'

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { sku, name, inventory } = request.body

    const createProduct = container.resolve(CreateProductsService)

    const product = await createProduct.execute({ sku, name, inventory })

    return response.json(product)
  }
}

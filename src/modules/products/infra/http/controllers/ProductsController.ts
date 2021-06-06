import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductsService from '@modules/products/services/CreateProductService'
import ShowProductService from '@modules/products/services/ShowProductService'

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { sku, name, inventory } = request.body

    const createProduct = container.resolve(CreateProductsService)

    const product = await createProduct.execute({ sku, name, inventory })

    return response.json(product)
  }

  public async show(request: Request, response: Response) : Promise<Response> {
    const { sku } = request.params

    const showProduct = container.resolve(ShowProductService)

    const product = await showProduct.execute({ sku })

    return response.json(product)
  }
}

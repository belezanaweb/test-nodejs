import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductsService from '@modules/products/services/CreateProductService'
import ShowProductService from '@modules/products/services/ShowProductService'
import UpdateProductService from '@modules/products/services/UpdateProductService';
import RemoveProductService from '@modules/products/services/RemoveProductService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { sku, name, inventory } = request.body

    const createProduct = container.resolve(CreateProductsService)
    const product = await createProduct.execute({ sku, name, inventory })

    return response.json(product)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { sku } = request.params

    const showProduct = container.resolve(ShowProductService)
    const product = await showProduct.execute({ sku })

    return response.json(product)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { sku } = request.params
    const { name, inventory } = request.body

    const updateProduct = container.resolve(UpdateProductService)
    const product = await updateProduct.execute({ sku, name, inventory })

    return response.json(product)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { sku } = request.params

    const removeProduct = container.resolve(RemoveProductService)
    await removeProduct.execute({ sku })

    return response.json({})
  }
}

import { Request, Response } from 'express';

import CreateProductService from '../../../services/CreateProductService';
import FindProductBySkuService from '../../../services/FindProductBySkuService';
import UpdateProductBySkuService from '../../../services/UpdateProductBySkuService';
import DeleteProductBySkuService from '../../../services/DeleteProductBySkuService';

import ProductRepository from '../../db/repositories/ProductReposity';
import Product from '../../db/entities/Product';

const productRepository = new ProductRepository();

export default class ProductController {
  public async find(request: Request, response: Response){
    const sku: number = Number(request.params.sku)

    const findProductBySkuService = new FindProductBySkuService(productRepository);

    const product = await findProductBySkuService.execute(sku);

    return response.json(product);
  }

  public async create(request: Request, response: Response){
    const product: Product = {
      sku: request.body.sku,
      name: request.body.name,
      inventory: request.body.inventory
    }

    const createProductService = new CreateProductService(productRepository);

    const productCreated = await createProductService.execute(product);

    return response.status(201).json(productCreated);
  }

  public async update(request: Request, response: Response){
    const sku: number = Number(request.params.sku)
    const reqProduct: Product = {
      sku: request.body.sku,
      name: request.body.name,
      inventory: request.body.inventory
    }

    const updateProductBySkuService = new UpdateProductBySkuService(productRepository);

    const product = await updateProductBySkuService.execute(sku, reqProduct)

    return response.json(product);
  }

  public async delete(request: Request, response: Response){
    const sku: number = Number(request.params.sku)
    const deleteProductBySkuService = new DeleteProductBySkuService(productRepository);

    await deleteProductBySkuService.execute(sku);

    return response.send().status(204)
  }
}

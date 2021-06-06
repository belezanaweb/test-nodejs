import { injectable, inject } from 'tsyringe'

import ProductsRepository from '@modules/products/repositories/ProductRepository'
import Product from '@modules/products/entities/Product'

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository
  ) { }

  public async execute({ name, sku, inventory }): Promise<Product> {
    return this.productsRepository.create({ name, sku, inventory })
  }
}

export default CreateProductService

import { injectable, inject } from 'tsyringe'

import ProductsRepository from '@modules/products/repositories/ProductRepository'
import Product from '@modules/products/entities/Product'

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository
  ) { }

  public async execute({ sku }): Promise<Product> {
    const product = await this.productsRepository.findBySku(sku)

    if(!product) {
      throw new Error('Product not found');
    }

    return product
  }
}

export default CreateProductService

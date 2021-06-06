import { injectable, inject } from 'tsyringe'

import ProductsRepository from '@modules/products/repositories/ProductRepository'
import Product from '@modules/products/entities/Product'

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository
  ) { }

  public async execute({ sku, name, inventory }): Promise<Product> {
    const product = await this.productsRepository.findBySku(sku)

    if(!product) {
      throw new Error('Product not found');
    }

    Object.assign(product, { name, inventory })

    return this.productsRepository.save(product)
  }
}

export default UpdateProductService

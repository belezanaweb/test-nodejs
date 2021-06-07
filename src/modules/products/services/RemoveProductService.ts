import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError';
import ProductsRepository from '@modules/products/repositories/ProductRepository'

@injectable()
class RemoveProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository
  ) { }

  public async execute({ sku }): Promise<void> {
    const product = await this.productsRepository.findBySku(sku)

    if(!product) {
      throw new AppError('Product not found');
    }

    return this.productsRepository.remove(sku)
  }
}

export default RemoveProductService

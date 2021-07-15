import { Either, left, right } from '../../../core/either'
import { ProductNotFoundError } from '../../../domain/errors/product-not-found'
import { ProductModel } from '../../../domain/models/product'
import { IFindProductBySkuUseCase } from '../../../domain/use-cases/find-product-by-sku'
import { IFindProductBySkuRepository } from '../../../repositories/find-product-by-sku'

export class FindProductBySkuUseCase implements IFindProductBySkuUseCase {
  constructor (private readonly findProductBySkuRepository: IFindProductBySkuRepository) {}

  async execute (sku: number): Promise<Either<ProductNotFoundError, ProductModel>> {
    const product = await this.findProductBySkuRepository.findBySku(sku)
    if (!product) {
      return left(new ProductNotFoundError())
    }

    return right(product)
  }
}

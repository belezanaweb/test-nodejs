import { Either, left, right } from '../../../core/either'
import { ProductNotFoundError } from '../../../domain/errors/product-not-found'
import { IDeleteProductBySkuUseCase } from '../../../domain/use-cases/delete-product-by-sku'
import { IDeleteProductRepository } from '../../../repositories/delete-product'
import { IFindProductBySkuRepository } from '../../../repositories/find-product-by-sku'

export class DeleteProductBySkuUseCase implements IDeleteProductBySkuUseCase {
  constructor (
    private readonly findProductBySkuRepository: IFindProductBySkuRepository,
    private readonly deleteProductBySkuRepository: IDeleteProductRepository
  ) {}

  async execute (sku: number): Promise<Either<ProductNotFoundError, void>> {
    const product = await this.findProductBySkuRepository.findBySku(sku)
    if (!product) {
      return left(new ProductNotFoundError())
    }

    await this.deleteProductBySkuRepository.delete(sku)

    return right()
  }
}

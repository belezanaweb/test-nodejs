import { Either } from '../../core/either'
import { ProductNotFoundError } from '../errors/product-not-found'
import { ProductModel } from '../models/product'

export interface IFindProductBySkuUseCase {
  execute(sku: number): Promise<Either<ProductNotFoundError, ProductModel>>
}

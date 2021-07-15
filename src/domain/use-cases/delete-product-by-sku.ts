import { Either } from '../../core/either'
import { ProductNotFoundError } from '../errors/product-not-found'

export interface IDeleteProductBySkuUseCase {
  execute(sku: number): Promise<Either<ProductNotFoundError, void>>
}

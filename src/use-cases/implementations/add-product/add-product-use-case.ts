import { Either, left, right } from '../../../core/either'
import { ProductAlreadyExistsError } from '../../../domain/errors/product-already-exists'
import { ProductModel } from '../../../domain/models/product'
import { AddProduct, AddProductDTO } from '../../../domain/use-cases/add-product'
import { FindProductBySkuRepository } from '../../../repositories/find-product-by-sku'

export class AddProductUseCase implements AddProduct {
  constructor (private readonly findProductBySkuRepository: FindProductBySkuRepository) {}

  async execute ({ sku, name, warehouses }: AddProductDTO): Promise<Either<ProductAlreadyExistsError, ProductModel>> {
    const productAlreadyExists = await this.findProductBySkuRepository.findBySku(sku)
    if (productAlreadyExists) {
      return left(new ProductAlreadyExistsError())
    }
    return new Promise(resolve => resolve(right({} as ProductModel)))
  }
}

import { Either, left, right } from '../../../core/either'
import { ProductAlreadyExistsError } from '../../../domain/errors/product-already-exists'
import { ProductModel } from '../../../domain/models/product'
import { AddProduct, AddProductDTO } from '../../../domain/use-cases/add-product'
import { ICreateProductRepository } from '../../../repositories/create-product'
import { FindProductBySkuRepository } from '../../../repositories/find-product-by-sku'

export class AddProductUseCase implements AddProduct {
  constructor (
    private readonly findProductBySkuRepository: FindProductBySkuRepository,
    private readonly createProductRepository: ICreateProductRepository
  ) {}

  async execute ({ sku, name, warehouses }: AddProductDTO): Promise<Either<ProductAlreadyExistsError, ProductModel>> {
    const productAlreadyExists = await this.findProductBySkuRepository.findBySku(sku)
    if (productAlreadyExists) {
      return left(new ProductAlreadyExistsError())
    }

    await this.createProductRepository.create({ sku, name, inventory: { warehouses } })

    return new Promise(resolve => resolve(right({} as ProductModel)))
  }
}

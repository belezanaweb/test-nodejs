import { Either, left, right } from '../../../core/either'
import { ProductAlreadyExistsError } from '../../../domain/errors/product-already-exists'
import { AddProduct, AddProductDTO, CreatedProduct } from '../../../domain/use-cases/add-product'
import { ICreateProductRepository } from '../../../repositories/create-product'
import { IFindProductBySkuRepository } from '../../../repositories/find-product-by-sku'

export class AddProductUseCase implements AddProduct {
  constructor (
    private readonly findProductBySkuRepository: IFindProductBySkuRepository,
    private readonly createProductRepository: ICreateProductRepository
  ) {}

  async execute ({ sku, name, warehouses }: AddProductDTO): Promise<Either<ProductAlreadyExistsError, CreatedProduct>> {
    const productAlreadyExists = await this.findProductBySkuRepository.findBySku(sku)
    if (productAlreadyExists) {
      return left(new ProductAlreadyExistsError())
    }

    const product = { sku, name, inventory: { warehouses } }

    for (const warehouse of warehouses) {
      warehouse.locality = warehouse.locality.toUpperCase()
      warehouse.type = warehouse.type.toUpperCase()
    }

    const newProduct = await this.createProductRepository.create(product)

    return right(newProduct)
  }
}

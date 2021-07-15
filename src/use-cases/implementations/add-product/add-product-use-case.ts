import { Either, left, right } from '../../../core/either'
import { ProductAlreadyExistsError } from '../../../domain/errors/product-already-exists'
import { AddProduct, AddProductDTO, CreatedProduct } from '../../../domain/use-cases/add-product'
import { ICreateProductRepository } from '../../../repositories/create-product'
import { FindProductBySkuRepository } from '../../../repositories/find-product-by-sku'

export class AddProductUseCase implements AddProduct {
  constructor (
    private readonly findProductBySkuRepository: FindProductBySkuRepository,
    private readonly createProductRepository: ICreateProductRepository
  ) {}

  async execute ({ sku, name, warehouses }: AddProductDTO): Promise<Either<ProductAlreadyExistsError, CreatedProduct>> {
    const productAlreadyExists = await this.findProductBySkuRepository.findBySku(sku)
    if (productAlreadyExists) {
      return left(new ProductAlreadyExistsError())
    }

    const newProduct = { sku, name, inventory: { warehouses } }
    await this.createProductRepository.create(newProduct)

    return right(newProduct)
  }
}

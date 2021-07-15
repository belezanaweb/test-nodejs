import { Either, left, right } from '../../../core/either'
import { ProductNotFoundError } from '../../../domain/errors/product-not-found'
import { ProductModel } from '../../../domain/models/product'
import { EditProductDTO, IEditProductUseCase } from '../../../domain/use-cases/edit-product'
import { IFindProductBySkuRepository } from '../../../repositories/find-product-by-sku'
import { IUpdateProductRepository } from '../../../repositories/update-product'

export class EditProductUseCase implements IEditProductUseCase {
  constructor (
    private readonly findProductBySkuRepository: IFindProductBySkuRepository,
    private readonly updateProductRepository: IUpdateProductRepository
  ) {}

  async execute ({ sku, name, warehouses }: EditProductDTO): Promise<Either<ProductNotFoundError, ProductModel>> {
    const product = await this.findProductBySkuRepository.findBySku(sku)
    if (!product) {
      return left(new ProductNotFoundError())
    }

    Object.assign(product, { name, inventory: { warehouses } })

    const updatedProduct = await this.updateProductRepository.update(product)

    return right(updatedProduct)
  }
}

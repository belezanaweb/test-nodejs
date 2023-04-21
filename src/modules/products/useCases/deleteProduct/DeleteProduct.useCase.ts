import { inject, injectable } from "tsyringe"
import { IProductsRepository } from "../../../../domain/repositories/IProducts.repository";
import { AppError } from "../../../../shared/excepetions/errors";
import { IProduct } from "../../../../domain/entities/products/Product";

@injectable()
class DeleteProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) { }

  async execute( sku : number) : Promise<IProduct> {
    const foundProduct = await this.productsRepository.getProduct(sku)

    if (!foundProduct) {
      throw new AppError(`Product does not exist`)
    }

    Object.assign(foundProduct, { isDeleted: true })
    return await this.productsRepository.delete(sku, foundProduct)
  }
}

export { DeleteProductUseCase }
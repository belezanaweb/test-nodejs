import { inject, injectable } from "tsyringe"
import { IProductsRepository } from "../../../../repostiories/IProducts.repository";
import { AppError } from "../../../../shared/excepetions/errors";

@injectable()
class DeleteProcuctUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) { }

  async execute( sku : number) : Promise<any> {
    const foundProduct = await this.productsRepository.getProduct(sku)

    if (!foundProduct) {
      throw new AppError(`Product does not exist`)
    }

    Object.assign(foundProduct, { isDeleted: true })
    return await this.productsRepository.delete(sku, foundProduct)
  }
}

export { DeleteProcuctUseCase }
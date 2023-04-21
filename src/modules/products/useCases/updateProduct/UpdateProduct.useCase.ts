import { inject, injectable } from "tsyringe"
import { IProduct } from "../../../../domain/entities/products/Product";
import { IProductsRepository } from "../../../../domain/repositories/IProducts.repository";
import { IUpdateProductDTO } from "../../dtos/IUpdateProductDTO";
import { AppError } from "../../../../shared/excepetions/errors";

@injectable()
class UpdateProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) { }

  async execute( sku : number, newData: IUpdateProductDTO) : Promise<IProduct> {
    const foundProduct = await this.productsRepository.getProduct(sku)

    if (!foundProduct) {
      throw new AppError(`Product does not exist`)
    }

    return await this.productsRepository.update(sku, newData)
  }
}

export { UpdateProductUseCase }
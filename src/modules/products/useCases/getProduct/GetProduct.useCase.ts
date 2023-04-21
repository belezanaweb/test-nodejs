import { inject, injectable } from "tsyringe"
import { IProduct } from "../../../../entities/products/Product";
import { IProductsRepository } from "../../../../repostiories/IProducts.repository";
import { StockProductService } from "../../service/StockProduct.service";
import { AppError } from "../../../../shared/excepetions/errors";

@injectable()
class GetProcuctUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    private productService: StockProductService
  ) { }

  async execute( sku : number) : Promise<IProduct> {
    const foundProduct = await this.productsRepository.getProduct(sku)

    if (!foundProduct) {
      throw new AppError(`sku ${sku} is not exist`)
    }

    return await this.productService.execute(foundProduct)
  }
}

export { GetProcuctUseCase }
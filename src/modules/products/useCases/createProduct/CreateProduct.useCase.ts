import { inject, injectable } from "tsyringe";
import { IProductsRepository } from "../../../../repostiories/IProducts.repository";
import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";
import { AppError } from "../../../../shared/excepetions/errors";

@injectable()
class CreateProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) { }

  async execute({
    sku,
    name,
    inventory
  }: ICreateProductDTO) : Promise<void> {
    const foundProduct = await this.productsRepository.getProduct(sku)

    if (foundProduct) {
      throw new AppError('sku already exist')
    }

    await this.productsRepository.create({sku, name, inventory})
  }
}

export { CreateProductUseCase }
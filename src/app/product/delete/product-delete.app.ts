import { IProductRepository } from "../../../repositories/iproduct.repository";
import { ErrorCustom } from "../../../utils/error-custom.util";

export class ProductDeleteApp {

  constructor(private readonly productRepository: IProductRepository) { }

  /**
   * Execute Delete
   * @param sku
   * @returns
   */
  async execute(sku: number): Promise<void> {
    const product = await this.productRepository.findWithWarehouse(sku);
    if (!product) {
      throw new ErrorCustom({
        code: 400,
        error: 'Produto não encontrado'
      });
    }
    await this.productRepository.remove(sku);
  }
}

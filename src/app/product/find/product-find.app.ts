import { Product } from "../../../domain/product";
import { IProductRepository } from "../../../repositories/iproduct.repository";
import { ErrorCustom } from "../../../utils/error-custom.util";

export class ProductFindApp {

  constructor(private readonly productRepository: IProductRepository) { }

  /**
   * Execute Find
   * @param sku
   * @returns
   */
  async execute(sku: number): Promise<any> {
    const product = await this.productRepository.findWithWarehouse(sku);
    if (!product) {
      throw new ErrorCustom({
        code: 400,
        error: 'Produto não encontrado'
      });
    }
    let quatity = 0;
    const warehouses = [];
    for (const warehouse of product.warehouses) {
      quatity += warehouse.quantity;
      const { locality, quantity, type } = warehouse;
      warehouses.push({ locality, quantity, type });
    }
    return {
      sku: product.sku,
      name: product.name,
      inventory: {
        quantity: quatity,
        warehouses: warehouses,
        isMarketable: quatity > 0
      }
    };
  }
}

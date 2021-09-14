import { IProductRepository } from "../../../repositories/iproduct.repository";

export class ProductGetAPP {

  constructor(private readonly productRepository: IProductRepository) { }

  /**
   * Execute Delete
   * @param sku
   * @returns
   */
  async execute(): Promise<any> {
    const products = await this.productRepository.get();
    const response = products.map((product) => {
      return {
        sku: product.sku,
        name: product.name,
        inventory: {
          warehouses: product.warehouses.map((warehouse) => {
            return {
              locality: warehouse.locality,
              quantity: warehouse.quantity,
              type: warehouse.type
            };
          })
        }
      };
    });
    return response;
  }
}

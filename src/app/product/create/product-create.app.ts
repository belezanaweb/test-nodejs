import { Product } from "../../../domain/product";
import { IProductRepository } from "../../../repositories/iproduct.repository";
import { IWarehouseRepository } from "../../../repositories/iwarehouse.repository";
import { ErrorCustom } from "../../../utils/error-custom.util";
import { IProductCreateDTO } from "./iproduct-create-dto.interface";

export class ProductCreateApp {

  constructor (
    private readonly productRepository: IProductRepository,
    private readonly warehouseRepository: IWarehouseRepository,
  ) {}

  /**
   * Execute Store
   * @param product
   * @returns
   */
  async execute(product: IProductCreateDTO): Promise<Product> {
    const exist = await this.productRepository.exist(product.sku);
    if (exist) {
      throw new ErrorCustom({
        code: 400,
        error: 'SKU em uso'
      });
    }
    const result = await this.productRepository.save({
      name: product.name,
      sku: product.sku
    });
    const listWarehouse = product.inventory.warehouses.map((warehouse) => {
      return {
        productId: result.sku,
        type: warehouse.type,
        locality: warehouse.locality,
        quantity: warehouse.quantity,
      }
    });
    await this.warehouseRepository.save(listWarehouse);
    return result;
  }
}

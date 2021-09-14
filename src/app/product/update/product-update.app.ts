import { Product } from "../../../domain/product";
import { IProductRepository } from "../../../repositories/iproduct.repository";
import { IWarehouseRepository } from "../../../repositories/iwarehouse.repository";
import { ErrorCustom } from "../../../utils/error-custom.util";
import { IProductUpdateDTO } from "./iproduct-update-dto.interface";

export class ProductUpdateApp {

  constructor(
    private readonly productRepository: IProductRepository,
    private readonly warehouseRepository: IWarehouseRepository,
  ) { }

  /**
   * Execute Update
   * @param product
   * @returns
   */
  async execute(sku: number, product: IProductUpdateDTO): Promise<Product> {
    let result = null;
    const productResult = await this.productRepository.find(sku);

    if (!productResult) {
      throw new ErrorCustom({
        code: 400,
        error: 'Produto não encontrado'
      });
    }

    if (productResult.sku == product.sku) {
      result = await this.productRepository.update(sku, {
        name: product.name,
        sku: product.sku
      });
    } else {
      const exist = await this.productRepository.exist(product.sku);
      if (exist) {
        throw new ErrorCustom({
          code: 400,
          error: 'SKU em uso'
        });
      }
      await this.productRepository.remove(sku);
      result = await this.productRepository.save({
        name: product.name,
        sku: product.sku
      });
    }

    await this.warehouseRepository.removeBySku(sku);

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

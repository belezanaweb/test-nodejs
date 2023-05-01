import { IInventoryRepository } from "../../../domain/repositories/InventoryRepository";
import { IProductRepository } from "../../../domain/repositories/ProductRepository";
import { IWarehouseRepository } from "../../../domain/repositories/WarehouseRepository";
import { IProductService, ProductService } from "../../../service/ProductService";

export default class ProductServiceFactory {
  private static productService: IProductService

  static async make(
    productRepository: IProductRepository,
    inventoryRepository: IInventoryRepository,
    warehouseRepository: IWarehouseRepository,
  ): Promise<IProductService> {
    if (this.productService) {
      return this.productService;
    }

    this.productService = new ProductService(
      productRepository,
      inventoryRepository,
      warehouseRepository,
    );
    return this.productService;
  }
}

import { ProductInventoryWarehouses } from "../dtos/ProductRequest.dto";
import { ProductWarehouse } from "../entities/product_warehouses.entity";

export interface IProductWarehouseRepository {
  findByProductSku(sku: number): Promise<ProductWarehouse>;
  createMany(
    producSku: number,
    dto: ProductInventoryWarehouses[]
  ): Promise<ProductWarehouse[]>;
  delete(productSku: number): Promise<boolean>;
}

import Inventory from "../../../domain/entities/Inventory";
import Product from "../../../domain/entities/Product";
import Warehouse from "../../../domain/entities/Warehouse";
import { ProductRaw } from "../../../domain/repositories/ProductRepository";

export class ProductDto {
  toDomain(rawProduct: ProductRaw): Product {
    return new Product(
      rawProduct.sku,
      rawProduct.name,
      new Inventory(
        rawProduct.inventory.warehouse.map((warehouse) => new Warehouse(warehouse.locality, warehouse.quantity, warehouse.type))
      ),
    );
  }
}

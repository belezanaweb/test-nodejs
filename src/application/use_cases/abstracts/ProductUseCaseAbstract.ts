import { ProductDTO } from "src/application/use_cases/DTO/ProductDTO";
import Product from "src/domain/entities/Product";
import Inventory from "src/domain/entities/Inventory";
import Warehouse, { WarehouseType } from "src/domain/entities/Warehouse";

export default abstract class ProductUseCaseAbstract {

  buildProductFromDTO(productDTO: ProductDTO): Product {
    const warehouses = productDTO.inventory.warehouses.map((warehouse) => (new Warehouse({
      locality: warehouse.locality,
      quantity: warehouse.quantity,
      type: WarehouseType[warehouse.type as keyof typeof WarehouseType]
    })));
    const inventory = new Inventory({ warehouses });
    return new Product({ sku: productDTO.sku, name: productDTO.name, inventory });
  }

  buildDTOFromProduct(product: Product): ProductDTO {
    return {
      sku: product.getSku(),
      name: product.getName(),
      inventory: {
        quantity: product.getInventory().getQuantity(),
        warehouses: product.getInventory().getWarehouses().map((warehouse) => ({
          locality: warehouse.getLocality(),
          quantity: warehouse.getQuantity(),
          type: warehouse.getType()
        })),
      },
      isMarketable: product.getIsMarketable()
    }
  }
}

import Product from "../../domain/Product";

export default class ProductService {
  async calculateInventoryQuantity(product: Product): Promise<void> {
    const { warehouses } = product.inventory;
    const quantity = warehouses.reduce(
      (acc, warehouse) => acc + warehouse.quantity,
      0
    );
    product.inventory.quantity = quantity;
  }

  async calculateIsMarketable(product: Product): Promise<void> {
    await this.calculateInventoryQuantity(product);
    product.isMarketable = product.inventory.quantity! > 0 ? true : false;
  }
}

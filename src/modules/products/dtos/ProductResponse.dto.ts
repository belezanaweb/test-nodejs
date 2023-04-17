import { Product } from "../entities/product.entity";

class ProductInventory {}

export class ProductResponseDto {
  public sku: number;
  public name: string;
  public get inventory() {
    const quantity = this.data.warehouses?.length;
    return {
      quantity,
      warehouses: this.data.warehouses,
    };
  }

  public get isMarketable() {
    return this.inventory.quantity > 0;
  }

  constructor(private readonly data: Partial<Product>) {}

  toJSON() {
    return {
      sku: this.data?.sku,
      name: this.data?.name,
      inventory: this.inventory || {},
      isMarketable: this.isMarketable,
    };
  }
}

import Inventory from "./Inventory";

export default class Product {
  sku: number;
  name: string;
  inventory: Inventory;
  isMarketable?: boolean;

  constructor(sku: number, name: string, inventory: Inventory) {
    this.sku = sku;
    this.name = name;
    this.inventory = inventory;
    this.isMarketable = this.getProductIsMarketable();
  }

  getProductIsMarketable(): boolean {
    return this.inventory.getTotalQuantityInWarehousesStock() > 0;
  }
}

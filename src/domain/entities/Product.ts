import Inventory from "./Inventory";

export default class Product {
  sku: string;
  name: string;
  inventory: Inventory;
  isMarketable?: boolean;

  constructor(sku: string, name: string, inventory: Inventory) {
    this.sku = sku;
    this.name = name;
    this.inventory = inventory;
  }

  getProductIsMarketable(): boolean {
    return this.inventory.getTotalQuantityInWarehousesStock() > 0;
  }
}

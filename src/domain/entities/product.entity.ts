import Inventory from './inventory.interface';

class Product {
  sku: number;
  name: string;
  inventory: Inventory;
  isMarketable?: boolean;

  constructor(sku: number, name: string, inventory: Inventory) {
    this.sku = sku;
    this.name = name;
    this.inventory = inventory;
  }

  getQuantity(): number {
    return this.inventory.warehouses.reduce((total, warehouse) => total + warehouse.quantity, 0);
  }

  getIsMarketable(): boolean {
    return this.getQuantity() > 0;
  }
}

export default Product;

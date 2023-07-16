export default class Product {
  sku: number;
  name: string;
  inventory: Inventory;
  isMarketable?: boolean;

  constructor(sku: number, name: string, inventory: Inventory) {
    this.sku = sku;
    this.name = name;
    this.inventory = inventory;
  }
}

interface Inventory {
  quantity?: number | 0;
  warehouses: Warehouse[];
}

interface Warehouse {
  locality: string;
  quantity: number;
  type: string;
}

//  in case the type of warehouse is defined as a union type restrict
//  should be possible validate and improve development tooling to catch
// potential errors and enhance code quality.
// type WarehouseType = "ECOMMERCE" | "PHYSICAL_STORE";

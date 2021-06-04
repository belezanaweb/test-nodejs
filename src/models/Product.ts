export interface Product {
  sku: number;
  name: string;
  inventory: Inventory;
  isMarketable?: boolean;
}

export interface Inventory {
  quantity?: number;
  warehouses: Warehouses[]
}

export interface Warehouses {
  locality: string;
  quantity: number;
  type: string;
}

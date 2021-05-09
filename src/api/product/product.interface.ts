export interface IWarehouse {
  locality: string;
  quantity: number;
  type: string;
}

export interface IInventory {
  quantity?: number;
  warehouses: IWarehouse[];
}

export interface IProduct {
  sku: number;
  name: string;
  inventory: IInventory;
  isMarketable?: boolean;
}

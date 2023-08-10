interface IWarehouse {
  locality: string;
  quantity: number;
  type: string;
}

export interface IProduct {
  sku: number;
  name: string;
  inventory: {
    quantity?: number;
    warehouses: IWarehouse[];
  };
  isMarketable?: boolean;
}

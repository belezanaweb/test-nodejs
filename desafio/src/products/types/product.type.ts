class Inventory {
  quantity: number;
  warehouses: Warehouses[];
}

class Warehouses {
  locality: string;
  quantity: number;
  type: string;
}

export class ProductType {
  sku: number;
  name: string;
  inventory: Inventory;
  isMarketable: boolean;
}

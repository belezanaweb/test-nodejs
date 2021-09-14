interface IInventory {
  warehouses: Array<IWarehouse>;
}

interface IWarehouse {
  locality: string;
  quantity: number;
  type: 'ECOMMERCE' | 'PHYSICAL_STORE';
}

export interface IProductUpdateDTO {
  sku: number;
  name: string;
  inventory: IInventory
}

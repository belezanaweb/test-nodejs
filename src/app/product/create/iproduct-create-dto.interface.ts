interface IInventory {
  warehouses: Array<IWarehouse>;
}

interface IWarehouse {
  locality: string;
  quantity: number;
  type: 'ECOMMERCE' | 'PHYSICAL_STORE';
}

export interface IProductCreateDTO {
  sku: number;
  name: string;
  inventory: IInventory
}

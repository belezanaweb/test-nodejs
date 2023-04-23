export interface IInputProduct {
  name: string;
  inventory: IInventory;
}

interface IInventory {
  warehouses: IWarehouses[];
}

interface IWarehouses {
  locality: string;
  quantity: number;
  type: string;
}

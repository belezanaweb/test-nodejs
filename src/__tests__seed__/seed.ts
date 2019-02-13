export const product_data: IProduct = {
  inventory: {
    warehouses: [
      {
        locality: 'SP',
        quantity: 10,
        type: 'FILIAL01',
      },
      {
        locality: 'RJ',
        quantity: 5,
        type: 'FILIAL02',
      },
    ],
  },
  name: 'Produto 01',
  sku: 1,
};

export const update_data = {
  inventory: {
    warehouses: [
      {
        quantity: 0,
      },
      {
        quantity: 0,
      },
    ],
  },
  name: 'Produto 02',
};

declare interface IProduct {
  sku: number;
  name: string;
  inventory: IInventory;
  isMarketable?: boolean;
}

interface IInventory {
  quantity?: number;
  warehouses: IWarehouses[];
}

interface IWarehouses {
  locality: string;
  quantity: number;
  type: string;
}

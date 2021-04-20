export enum WharehouseType {
  ECOMMERCE = 'ECOMMERCE',
  PHYSICAL_STORE = 'PHYSICAL_STORE',
}

export class Products {
  sku!: number;

  name!: string;

  inventory!: {
    quantity?: number;
    wharehouses: [
      {
        locality: string;
        quantity: number;
        type: WharehouseType;
      },
    ];
  };

  isMarketable?: boolean;
}

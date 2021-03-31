export class Product {
  sku: number;
  name: string;
  inventory: {
    warehouses: {
      locality: string;
      quantity: number;
      type: string;
    }[];
    quantity?: number;
  };
  isMarketable?: boolean;
}

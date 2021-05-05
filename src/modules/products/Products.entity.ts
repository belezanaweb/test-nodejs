import Warehouses from "@modules/warehouses/Warehouses.entity";

export default class Products {
  sku: string;
  name: string;
  isMarketable?: boolean;
  inventory: {
    quantity?: number;
    warehouses: Array<Warehouses>;
  };
}

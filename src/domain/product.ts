import { Warehouse } from "./warehouse";

export class Product {

  public static instance: Product;

  public sku: number;
  public name: string;
  public warehouses?: Array<Warehouse>;
  public isMarketable?: boolean;

  constructor (product: Product) {
    this.sku = product.sku;
    this.name = product.name;
    this.warehouses = product.warehouses;
    this.isMarketable = product.isMarketable;
  }
}

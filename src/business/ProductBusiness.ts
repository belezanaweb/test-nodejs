import { ProductDatabase } from "../data/ProductDatabase";
import { Inventory } from "../model/Inventory";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { Product } from "../model/Product";

export class ProductBusiness {
  constructor(private productDataBase: ProductDatabase) {}

  public createProduct(sku: number, name: string, inventory: Inventory): void {
    if (!sku || !name || !inventory) {
      throw new InvalidParameterError("Missing input");
    }

    this.productDataBase.createProduct(new Product(sku, name, inventory));
  }
}

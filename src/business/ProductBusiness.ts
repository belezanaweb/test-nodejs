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

  public getProductBySku(sku: number): any {
    if (!sku) {
      throw new InvalidParameterError("Missing input");
    }
    const result = this.productDataBase.getProductBySku(sku);
    return result;
  }

  public editProductBySku(sku: number, product: Product): any {
    if (!sku || !product) {
      throw new InvalidParameterError("Missing input");
    }

    this.productDataBase.editProductBySku(sku, product);
  }

  public deleteProductBySku(sku: number): void {
    if (!sku) {
      throw new InvalidParameterError("Missing input");
    }

    this.productDataBase.deleteProductBySku(sku);
  }
}

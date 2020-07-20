import { ProductDatabase } from "../data/ProductDatabase";
import { Inventory } from "../model/Inventory";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { Product } from "../model/Product";
import { GenericError } from "../errors/GenericError";

export class ProductBusiness {
  constructor(private productDataBase: ProductDatabase) {}

  public createProduct(sku: number, name: string, inventory: Inventory): void {
    if (!sku || !name || !inventory) {
      throw new InvalidParameterError("Missing input");
    }

    const productFound = this.productDataBase.foundProduct(sku)

    if(productFound){
        throw new GenericError("This product already exists.")
    }

    this.productDataBase.createProduct(new Product(sku, name, inventory));
  }

  public getProductBySku(sku: number): any {
    if (!sku) {
      throw new InvalidParameterError("Missing input");
    }
    const product = this.productDataBase.getProductBySku(sku);
    
    return product;
  }

  public editProductBySku(sku: number, product: Product): void {
    if (!sku || !product.getSku() || !product.getName() || !product.getInventory()) {
      throw new InvalidParameterError("Missing input");
    }

    this.productDataBase.editProductBySku(sku, product);
  }

  public deleteProductBySku(sku: number): string {
    if (!sku) {
      throw new InvalidParameterError("Missing input");
    }

   return this.productDataBase.deleteProductBySku(sku);
  }
}

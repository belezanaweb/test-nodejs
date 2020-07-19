import { FileManager } from "./FileManager";
import { Product } from "../model/Product";

const fileProducts = new FileManager("products.json")

export class ProductDatabase {
  private allProducts: Product[] = require("../../products.json");

  public getAllProducts(): Product[] {
    const fileManager = new FileManager("products.json");
    const products = fileManager.readFile();
    return products;
  }

  public createProduct(product: Product): void {
    this.allProducts = this.getAllProducts();
    this.allProducts.push(product);
    fileProducts.writeFile(this.allProducts)
  }
}

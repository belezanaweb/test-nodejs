import { FileManager } from "./FileManager";
import { Product } from "../model/Product";

const fileProducts = new FileManager("products.json");

export class ProductDatabase {
  private allProducts = require("../../products.json");

  public getAllProducts(): Product[] {
    const fileManager = new FileManager("products.json");
    const products = fileManager.readFile();
    return products;
  }

  public createProduct(product: Product): void {
    this.allProducts = this.getAllProducts();
    this.allProducts.push(product);
    fileProducts.writeFile(this.allProducts);
  }

  public getProductBySku(sku: number): Product {
    this.allProducts = this.getAllProducts();
    const product = this.allProducts.filter((product: any) => {
      if (product.sku === sku) {
        return product;
      }
    });

    return product;
  }

  public editProductBySku(sku: number, product: Product): void {
    this.allProducts = this.getAllProducts();
    const result = this.allProducts.map((productData: any) => {
      if (productData.sku === sku) {
        productData = product;
      }
      return productData;
    });

    fileProducts.writeFile(result);
  }

  public deleteProductBySku(sku: number): void {
    this.allProducts = this.getAllProducts();
    const result = this.allProducts.filter((productData: any) => {
      if (productData.sku !== sku) {
        return productData;
      }
    });

    fileProducts.writeFile(result);
  }
}

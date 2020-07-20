import { FileManager } from "./FileManager";
import { Product } from "../model/Product";
import { Inventory } from "../model/Inventory";
import { Warehouse } from "../model/Warehouse";

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

  public getProductBySku(sku: number): any {
    this.allProducts = this.getAllProducts();
    const result = this.allProducts.filter((product: any) => {
      if (product.sku === sku) {
        return product;
      }
    });

    const product = result[0]

    const warehouses = product.inventory.warehouses.map((warehouse: any) => {
      return new Warehouse(warehouse.locality, warehouse.quantity, warehouse.type)
    })

    const newInventory = new Inventory(warehouses)
    const quantity = newInventory.setQuantity(warehouses)

    const newProduct = new Product(product.sku, product.name, newInventory)
    newProduct.setIsMarketable(quantity)

    return newProduct;
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

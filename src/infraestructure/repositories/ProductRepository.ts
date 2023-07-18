import Product from "../../domain/Product";
import { DuplicateError } from "../../errors";
import ProductNotFoundError from "../../errors/ProductNotFoundError";
import ProductsRepositoryI from "./ProductRepositoryInterface";

export default class ProductRepository implements ProductsRepositoryI {
  private products: Product[] = []; // to keep the database in memory

  async findBySku(sku: number): Promise<Product | undefined> {
    const product: Product | undefined = this.products.find(
      (p) => p.sku === sku
    );
    if (product) {
      product.inventory.quantity = product.calculateInventoryQuantity();
      product.isMarketable = product.calculateIsMarketableQuantiy();
    }
    return product;
  }

  async save(product: Product, isForNewProduct: boolean): Promise<Product> {
    const index = this.products.findIndex((p) => p.sku === product.sku);

    if (index !== -1) {
      if (isForNewProduct) {
        throw new DuplicateError(product.sku.toString());
      } else {
        this.products[index] = product;
      }
    } else {
      if (!isForNewProduct) {
        throw new ProductNotFoundError(product.sku);
      }
      this.products.push(product);
    }

    return product;
  }

  async delete(sku: number): Promise<void> {
    const index = this.products.findIndex((p) => p.sku === sku);
    if (index === -1) {
      throw new ProductNotFoundError(sku);
    }
    this.products.splice(index, 1);
  }
}

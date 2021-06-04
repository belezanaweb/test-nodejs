import { Product } from "../models/Product";
import ProductRepository from "./interfaces/ProductRepository";

export class ProductRepositoryInMemory implements ProductRepository {

  private products: Product[]

  constructor() {
    this.products = [];
  }

  public create(product: Product): Promise<Product> {
    const createdProduct = this.products.find(prod => prod.sku == product.sku);
    if (createdProduct) {
      throw new Error("Product already exists");
    }

    this.products.push(product);
    return Promise.resolve(product);
  }

  public async get(sku: number): Promise<Product> {
    const product = this.products.find(prod => prod.sku == sku);
    if(!product) {
      throw new Error("Product not found!");
    }

    return Promise.resolve(product);
  }

  public async update(sku: number, product: Product): Promise<Product> {
    const position = this.products.findIndex(prod => prod.sku == sku);

    if(position < 0) {
      throw new Error("Product not found!");
    }

    this.products[position] = product;
    return Promise.resolve(this.products[position]);
  }

  public async delete(sku: number): Promise<boolean> {
    const position = this.products.findIndex(prod => prod.sku == sku);

    if(position < 0) {
      throw new Error("Product not found!");
    }

    this.products.splice(position, 1);
    return true;
  }

}

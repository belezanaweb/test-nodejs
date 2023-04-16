import Product from "src/domain/entities/Product";
import ProductAlreadyExistsException from "src/domain/exceptions/ProductAlreadyExistsException";
import ProductRepository from "src/domain/repositories/ProductRepository";

export default class ProductRepositoryMemory implements ProductRepository {
  private products: Product[];

  constructor() {
    this.products = [];
  }

  async create({ product }: { product: Product }): Promise<Product> {
    const found = await this.getBySku({ sku: product.getSku() });
    if (found) throw new ProductAlreadyExistsException("Product exists with same SKU");
    this.products.push(product);
    return product;
  }

  async update({ product }: { product: Product; }): Promise<Product> {
    const foundIndex = this.products.findIndex((p) => p.getSku() === product.getSku());
    if (foundIndex === -1) throw new ProductAlreadyExistsException(`Product SKU ${product.getSku()} not found while updating`);
    this.products[foundIndex] = product;
    return product;
  }

  async delete({ sku }: { sku: string; }): Promise<void> {
    const found = this.products.find((p) => p.getSku() === sku);
    if (!found) throw new ProductAlreadyExistsException(`Product SKU ${sku} not found while updating`);
    this.products = this.products.filter((p) => p.getSku() !== sku );
  }

  async getBySku({ sku }: { sku: string; }): Promise<Product | null> {
    const found = this.products.find((product) => product.getSku() === sku);
    return !found ? null : found;
  }
}

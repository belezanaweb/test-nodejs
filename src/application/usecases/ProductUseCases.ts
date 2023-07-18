import Product from "../../domain/Product";
import { ApplicationError, ProductNotFoundError } from "../../errors";
import ProductRepositoryI from "../../infraestructure/repositories/ProductRepositoryInterface";

export default class ProductUseCase {
  private productRepositoryI: ProductRepositoryI;

  constructor(productRepositoryI: ProductRepositoryI) {
    this.productRepositoryI = productRepositoryI;
  }

  async getProduct(sku: number): Promise<Product> {
    const product = await this.productRepositoryI.findBySku(sku);

    if (!product) {
      throw new ProductNotFoundError(sku);
    }
    return product;
  }

  async createProduct(productData: Product): Promise<Product> {
    const newProduct = await this.productRepositoryI.save(productData, true);
    if (!newProduct) {
      throw new ApplicationError("Failed to create product");
    }

    return newProduct;
  }

  async updateProduct(newData: Product): Promise<Product> {
    await this.productRepositoryI.save(newData, false);

    return newData;
  }

  async deleteProduct(sku: number): Promise<void> {
    await this.productRepositoryI.delete(sku);
  }
}

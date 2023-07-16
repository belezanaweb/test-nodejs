import Product from "../../domain/Product";
import ProductNotFoundError from "../../errors/ProductNotFoundError";

export default class ProductRepository {
  private static products: Product[] = []; // to keeps databae in memory

  async findBySku(sku: number): Promise<Product | undefined> {
    try {
      return ProductRepository.products.find((product) => product.sku === sku);
    } catch (error) {
      throw new ProductNotFoundError(sku);
    }
  }

  async save(product: Product): Promise<void> {
    try {
      ProductRepository.products.push(product);
    } catch (error) {
      throw new ProductNotFoundError(product.sku);
    }
  }

  async delete(product: Product): Promise<void> {
    try {
      const index = ProductRepository.products.findIndex(
        (p) => p.sku === product.sku
      );
      if (index !== -1) {
        ProductRepository.products.splice(index, 1);
      }
    } catch (error) {
      throw new ProductNotFoundError(product.sku);
    }
  }
}

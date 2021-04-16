import Product from '../db/entities/Product';

export default interface IProductRepository {
  create(product: Product): Promise<Product | undefined>;
  getProductBySku(sku: number): Promise<Product | undefined>;
  updateProduct(sku: number, product: Product): Promise<Product | undefined>;
  deleteProduct(sku: number): Promise<void | undefined>;
}

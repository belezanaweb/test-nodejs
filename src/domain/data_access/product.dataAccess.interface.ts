import Product from '../entities/product.entity';

interface IProductDataAccess {
  createProduct(product: Product): Promise<Product>;
  updateProduct(sku: number, product: Product): Promise<Product>;
  getProduct(sku: number): Promise<Product | undefined>;
  deleteProduct(sku: number): Promise<void>;
}

export default IProductDataAccess;

import Product from '../../domain/entities/product.entity';
import IProductDataAccess from '../../domain/data_access/product.dataAccess.interface';

class ProductUseCase {
  private productDataAccess: IProductDataAccess;

  constructor(productDataAccess: IProductDataAccess) {
    this.productDataAccess = productDataAccess;
  }

  async createProduct(product: Product): Promise<Product> {
    return this.productDataAccess.createProduct(product);
  }

  async updateProduct(sku: number, product: Product): Promise<Product> {
    return this.productDataAccess.updateProduct(sku, product);
  }

  async getProduct(sku: number): Promise<Product | undefined> {
    return this.productDataAccess.getProduct(sku);
  }

  async deleteProduct(sku: number): Promise<void> {
    this.productDataAccess.deleteProduct(sku);
  }
}

export default ProductUseCase;

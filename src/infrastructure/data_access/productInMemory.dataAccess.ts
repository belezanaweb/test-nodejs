import Product from '../../domain/entities/product.entity';
import IProductDataAccess from '../../domain/data_access/product.dataAccess.interface';

class ProductInMemoryDataAccess implements IProductDataAccess {
  // Produto armazenado em memória como requisitado pelo desafio
  private products: Product[] = [];

  async createProduct(product: Product): Promise<Product> {
    const productExists = this.products.some((p) => p.sku === product.sku);

    if (productExists) {
      throw new Error('Product with the same SKU already exists.');
    }

    this.products.push(product);
    return product;
  }

  async updateProduct(sku: number, product: Product): Promise<Product> {
    const index = this.products.findIndex((p) => p.sku === sku);

    if (index === -1) {
      throw new Error('Product not found.');
    }

    this.products[index] = product;
    product.inventory.quantity = product.getQuantity();
    product.isMarketable = product.getIsMarketable();
    return product;
  }

  async getProduct(sku: number): Promise<Product | undefined> {
    const product: Product | undefined = this.products.find((p) => p.sku === sku);
    if (product) {
      product.inventory.quantity = product.getQuantity();
      product.isMarketable = product.getIsMarketable();
    }
    return product;
  }

  async deleteProduct(sku: number): Promise<void> {
    const index = this.products.findIndex((p) => p.sku === sku);

    if (index === -1) {
      throw new Error('Product not found.');
    }

    this.products.splice(index, 1);
  }
}

export default ProductInMemoryDataAccess;

import AppError from '../../../../../shared/error/AppError';
import IProductRepository from '../../repositories/IProductRepository';
import Product from '../entities/Product';

class ProductRepository implements IProductRepository {
  private products: Product[] = []
  public async create(product: Product): Promise<Product | undefined> {
    try {
      const productFinded = this.products.find(p => p.sku === product.sku)

      if(productFinded) {
        throw new AppError('product already exists', 406)
      }

      Object.assign(product, {isMarketable: true})

      this.products.push(product);

      return product ;
    } catch (error) {
      return error
    }
  }

  public async getProductBySku(sku: number): Promise<Product | undefined> {
    try {
      const product: Product = this.products.find(product => product.sku === sku)!

      if(!product) {
        throw new AppError('Product not found', 404)
      }

      return product;
    } catch (error) {
      return error
    }
  }

  public async updateProduct(sku: number, product: Product): Promise<Product | undefined> {
    try {
      const productIndex = this.products.findIndex(product => product.sku === sku)

      if(productIndex === -1) {
        throw new AppError('Product does not exists', 404)
      }

      this.products[productIndex] = product

      return this.products[productIndex];
    } catch (error) {
      return error
    }
  }

  public async deleteProduct(sku: number): Promise<void | undefined> {
    try {
      const productIndex = this.products.findIndex(product => product.sku === sku)

      if(productIndex === -1) {
        throw new AppError('Product not found')
      }
      this.products.splice(productIndex, 1);
      return
    } catch (error) {
      return error
    }
  }
}

export default ProductRepository;

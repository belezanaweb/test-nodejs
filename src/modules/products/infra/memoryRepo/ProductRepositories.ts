import { IInputProduct } from 'modules/products/dto/IInputProduct';
import {
  IProductRepo,
  Product,
  instanceOfProduct,
} from '../../repo/IProductRepo';
import AppError from '../../../../shared/errors/AppError';
import MemoryProducts from '../../../../shared/infra/data';

class ProductRepository implements IProductRepo {
  private dataProduct: MemoryProducts;

  constructor() {
    this.dataProduct = new MemoryProducts();
  }

  async find(sku: number): Promise<Product | null> {
    try {
      const product: Product | object = await this.dataProduct.find(sku);
      if (instanceOfProduct(product)) return product;
      return null;
    } catch (err: any) {
      console.log(err);
      throw new AppError(err.message, `ProductRepository -> find()`);
    }
  }

  async create(data: IInputProduct): Promise<Product> {
    try {
      return await this.dataProduct.create(data);
    } catch (err: any) {
      console.log(err);
      throw new AppError(err.message, `ProductRepository -> create()`);
    }
  }

  async update(sku: number, data: IInputProduct): Promise<Product> {
    try {
      return await this.dataProduct.update(sku, data);
    } catch (err: any) {
      console.log(err);
      throw new AppError(err.message, `ProductRepository -> update()`);
    }
  }

  async delete(sku: number): Promise<void> {
    try {
      await this.dataProduct.delete(sku);
    } catch (err: any) {
      console.log(err);
      throw new AppError(err.message, `ProductRepository -> delete()`);
    }
  }
}

export default ProductRepository;

import { ProductResquestData } from '../../src/application/v1/dto/productResquest';
import Product from '../../src/domain/entities/Product';
import { IProductService } from '../../src/service/ProductService';

export default class ProductServiceMock implements IProductService {
  async create(_product: ProductResquestData): Promise<string> {
    return '';
  }

  async getBySku(_sku: number): Promise<Product> {
    return {} as Product;
  }

  async delete(_sku: number): Promise<void> {}

  async update(_productRequestData: ProductResquestData): Promise<Product> {
    return {} as Product;
  }
}

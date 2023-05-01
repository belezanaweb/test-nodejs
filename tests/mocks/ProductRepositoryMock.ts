import { IProductRepository, ProductRaw } from '../../src/domain/repositories/ProductRepository';

export default class ProductRepositoryMock implements IProductRepository {
  async create(_name: string, _sku: number): Promise<string> {
    return '';
  }

  async getBySky(_sku: number): Promise<ProductRaw> {
    return {} as ProductRaw;
  }

  async delete(_sku: number): Promise<void> {}
}

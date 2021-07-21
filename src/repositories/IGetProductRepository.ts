import Product from '../domain/entities/Product';

export default interface IGetProductRepository {
  get(sku: number): Promise<Product | undefined>
}

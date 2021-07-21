import Product from '../domain/entities/Product';

export default interface IGetAllProductsRepository {
  getAll(): Promise<Product[]>
}

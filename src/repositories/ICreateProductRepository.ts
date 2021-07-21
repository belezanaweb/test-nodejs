import Product from '../domain/entities/Product';
import ProductDTO from '../use-cases/product/ProductDTO';

export default interface ICreateProductRepository {
  create(data: ProductDTO): Promise<Product>
}

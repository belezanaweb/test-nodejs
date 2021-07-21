import Product from '../domain/entities/Product';
import ProductDTO from '../use-cases/product/ProductDTO';

export default interface IUpdateProductRepository {
  update(sku: number, data: ProductDTO): Promise<Product>
}

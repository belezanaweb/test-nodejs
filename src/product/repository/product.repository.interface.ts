import { Product } from '../entities/product.entity';

export abstract class IProductRepository {
  abstract createOne(product: Product): Promise<Product>;
  abstract findOne(sku: number): Promise<Product | null>;
  abstract updateOne(sku: number, product: Partial<Product>): Promise<Product>;
  abstract deleteOne(sku: number): Promise<Product>;
}

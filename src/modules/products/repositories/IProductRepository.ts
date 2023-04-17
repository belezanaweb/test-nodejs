import { ProductRequest } from "../dtos/ProductRequest.dto";
import { Product } from "../entities/product.entity";

export interface IProductRepository {
  findBySku(sku: number): Promise<Product>;
  create(dto: ProductRequest): Promise<Product>;
  update(dto: ProductRequest): Promise<Product>;
  delete(sku: number): Promise<boolean>;
}

import { Product } from "../../models/Product";

export default interface ProductRepository {
  create(product: Product): Promise<Product>;
  get(sku: number): Promise<Product | null>;
  update(sku:number, product: Product): Promise<Product>;
  delete(sku: number): Promise<boolean>;
}

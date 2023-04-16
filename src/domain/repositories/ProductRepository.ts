import Product from "src/domain/entities/Product";

export default interface ProductRepository {
  create({ product }: { product: Product }): Promise<Product>;
  update({ product }: { product: Product }): Promise<Product>;
  delete({ sku }: { sku: number }): Promise<void>;
  getBySku({ sku }: { sku: number }): Promise<Product|null>;
}

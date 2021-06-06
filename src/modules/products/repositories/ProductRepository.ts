import Product from "@modules/products/entities/Product";
import CreateProductDTO from '@modules/products/dto/CreateProductDTO'

export default interface ProductsRepository {
  create(data: CreateProductDTO): Promise<Product>;
  save(data: Product): Promise<Product | undefined>
  remove(sku: number): Promise<void>
  findBySku(sku: number): Promise<Product | undefined>
}

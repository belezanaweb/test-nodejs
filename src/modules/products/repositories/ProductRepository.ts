import Product from "@modules/products/entities/Product";
import CreateProductDTO from '@modules/products/dto/CreateProductDTO'

export default interface ProductsRepository {
  create(data: CreateProductDTO): Promise<Product>;
  findBySku(sku: number): Promise<Product | undefined>
  save(data: Product): Promise<Product | undefined>
}

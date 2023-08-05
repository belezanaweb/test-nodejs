import { Product } from '../domain/product'

export interface ProductGateway {
  add(product: Product): Promise<void>
  findBySku(sku: number): Promise<Product | undefined>
  update(product: Product): Promise<Product>
  delete(sku: number): Promise<void>
}

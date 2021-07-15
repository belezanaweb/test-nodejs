import { ProductModel } from '../domain/models/product'

export interface FindProductBySkuRepository {
  findBySku(sku: number): Promise<ProductModel | undefined>
}

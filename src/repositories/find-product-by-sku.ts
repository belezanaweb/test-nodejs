import { ProductModel } from '../domain/models/product'

export interface IFindProductBySkuRepository {
  findBySku(sku: number): Promise<ProductModel | undefined>
}

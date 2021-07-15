import { ProductModel } from '../domain/models/product'
import { WarehouseModel } from '../domain/models/warehouse'

export type CreateProductDTO = {
  sku: number
  name: string
  inventory: {
    warehouses: WarehouseModel[]
  }
}

export interface ICreateProductRepository {
  create(productDTO: CreateProductDTO): Promise<ProductModel>
}

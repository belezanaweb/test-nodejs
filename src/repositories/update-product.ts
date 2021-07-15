import { ProductModel } from '../domain/models/product'
import { WarehouseModel } from '../domain/models/warehouse'

export type UpdateProductDTO = {
  sku: number
  name: string
  inventory: {
    warehouses: WarehouseModel[]
  }
}

export interface IUpdateProductRepository {
  update(productDTO: UpdateProductDTO): Promise<ProductModel>
}

import { WarehouseModel } from './warehouse'

export type ProductModel = {
  sku: number
  name: string
  inventory: InventoryModel
  isMarketable?: boolean
}

export type InventoryModel = {
  quantity?: number
  warehouses: WarehouseModel[]
}

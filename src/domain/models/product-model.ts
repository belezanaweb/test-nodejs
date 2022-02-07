import { IInventory } from './inventory-model'

export interface IProductModel {
  sku: number
  name: string
  inventory: IInventory
  isMarketable: boolean
}

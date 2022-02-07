import { IInventoryModel } from './inventory-model'

export interface IProductModel {
  sku: number
  name: string
  inventory: IInventoryModel
  isMarketable: boolean // Calculado!
}

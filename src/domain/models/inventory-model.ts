import { IWarehouse } from './warehouse-model'

export interface IInventory {
  quantity: number
  warehouses: IWarehouse[]
}

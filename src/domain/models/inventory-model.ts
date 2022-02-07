import { IWarehouseModel } from './warehouse-model'

export interface IInventoryModel {
  quantity: number // Calculado!
  warehouses?: IWarehouseModel[]
}

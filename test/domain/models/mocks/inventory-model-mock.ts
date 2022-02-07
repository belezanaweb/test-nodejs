import { IInventoryModel } from '@/domain/models/inventory-model'
import { datatype, random } from 'faker/locale/pt_BR'
import { makeFakeWarehouseModel } from './warehouse-model-mock'

export const makeFakeInventoryModel = (): IInventoryModel => ({
  quantity: datatype.number(),
  warehouses: random.arrayElements([makeFakeWarehouseModel()], datatype.number({ min: 1, max: 5 }))
})

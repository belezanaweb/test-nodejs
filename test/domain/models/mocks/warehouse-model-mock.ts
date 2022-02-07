import { IWarehouseModel } from '@/domain/models/warehouse-model'
import { address, datatype, random } from 'faker/locale/pt_BR'

export const makeFakeWarehouseModel = (): IWarehouseModel => ({
  locality: address.cityName(),
  quantity: datatype.number(),
  type: random.arrayElement(['PHYSICAL_STORE', 'ECOMMERCE'])
})

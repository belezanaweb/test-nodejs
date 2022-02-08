import { IInventoryModel, IProductModel, IWarehouseModel } from '@/domain/models/product-model'
import { address, commerce, datatype, random } from 'faker/locale/pt_BR'

export const makeFakeProductModel = (): IProductModel => ({
  sku: datatype.number(),
  name: commerce.productName(),
  inventory: makeFakeInventoryModel(),
  isMarketable: datatype.boolean()
})

export const makeFakeInventoryModel = (): IInventoryModel => ({
  quantity: datatype.number(),
  warehouses: random.arrayElements([makeFakeWarehouseModel()], datatype.number({ min: 1, max: 5 }))
})

export const makeFakeWarehouseModel = (): IWarehouseModel => ({
  locality: address.cityName(),
  quantity: datatype.number(),
  type: random.arrayElement(['PHYSICAL_STORE', 'ECOMMERCE'])
})

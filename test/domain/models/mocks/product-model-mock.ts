import { IInventoryModel, IProductModel, IWarehouseModel } from '@/domain/models/product-model'
import { address, commerce, datatype, random } from 'faker/locale/pt_BR'

export const makeFakeProductModel = (): IProductModel => ({
  sku: datatype.number(),
  name: commerce.productName(),
  inventory: makeFakeInventoryModel(),
  isMarketable: undefined // datatype.boolean()
})

export const makeFakeInventoryModel = (): IInventoryModel => ({
  quantity: undefined, // datatype.number(),
  warehouses: random.arrayElements([makeFakeWarehouseModel()], datatype.number({ min: 1, max: 3 }))
})

export const makeFakeWarehouseModel = (): IWarehouseModel => ({
  locality: address.cityName(),
  quantity: datatype.number(),
  type: random.arrayElement(['PHYSICAL_STORE', 'ECOMMERCE'])
})

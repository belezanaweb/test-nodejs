import { IProductModel } from '@/domain/models/product-model'
import { commerce, datatype } from 'faker/locale/pt_BR'
import { makeFakeInventoryModel } from './inventory-model-mock'

export const makeFakeProductModel = (): IProductModel => ({
  sku: datatype.number(),
  name: commerce.productName(),
  inventory: makeFakeInventoryModel(),
  isMarketable: datatype.boolean()
})

import { IProductModel } from '@/domain/models/product-model'

export interface ICalculateProductAttributes {
  calcTotalQuantity: (model: IProductModel) => Promise<number>
  calcIsMarketable: (model: IProductModel) => Promise<boolean>
}

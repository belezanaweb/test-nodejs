import { IProductModel } from '@/domain/models/product-model'

export interface IFindProductById {
  findById: (sku: number) => Promise<IProductModel | undefined>
}

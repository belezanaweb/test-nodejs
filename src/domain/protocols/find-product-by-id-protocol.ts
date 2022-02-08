import { IProductModel } from '@/domain/models/product-model'

export namespace NsFindProductById {
  export type Output = IProductModel | undefined
}

export interface IFindProductById {
  findById: (sku: number) => Promise<NsFindProductById.Output>
}

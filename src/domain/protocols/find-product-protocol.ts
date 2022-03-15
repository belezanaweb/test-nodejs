import { IProductModel } from '@/domain/models/product-model'

export namespace NsFindProduct {
  export type FindAllOutput = IProductModel[] | undefined
  export type FindByIdOutput = IProductModel | undefined
}

export interface IFindProducts {
  findAll: () => Promise<NsFindProduct.FindAllOutput>
}

export interface IFindProductById {
  findById: (sku: number) => Promise<NsFindProduct.FindByIdOutput>
}

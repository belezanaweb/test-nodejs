import { IProductModel } from '@/domain/models/product-model'

export interface IDbFindProducts {
  findAll: () => Promise<IProductModel[] | []>
}

export interface IDbFindProductById {
  findById: (sku: number) => Promise<IProductModel | undefined>
}

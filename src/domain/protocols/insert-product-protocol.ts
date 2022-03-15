import { IProductModel } from '@/domain/models/product-model'

export namespace NsInsertProduct {
  export type Input = {
    sku: number
    name: string
    inventory: {
      warehouses: Array<{
        locality: string
        quantity: number
        type: 'PHYSICAL_STORE' | 'ECOMMERCE'
      }>
    }
  }
}

export interface IInsertProduct {
  insert: (params: NsInsertProduct.Input) => Promise<IProductModel>
}

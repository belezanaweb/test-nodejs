import { IProductModel } from '@/domain/models/product-model'

export namespace NsCreateProduct {
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

export interface ICreateProduct {
  create: (params: NsCreateProduct.Input) => Promise<IProductModel>
}

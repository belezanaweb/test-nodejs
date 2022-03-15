import { IProductModel } from '@/domain/models/product-model'

export namespace NsUpdateProduct {
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

export interface IUpdateProductById {
  updateById: (params: NsUpdateProduct.Input) => Promise<IProductModel>
}

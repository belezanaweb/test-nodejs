import { IProductModel } from '@/domain/models/product-model'

export namespace NsUpdateProduct {
  export type Input = {
    oldSku: number
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

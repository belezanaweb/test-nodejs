export namespace NsDbUpdateProduct {
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

export interface IDbUpdateProductById {
  updateById: (params: NsDbUpdateProduct.Input) => Promise<string>
}

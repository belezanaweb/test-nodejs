export namespace NsDbInsertProduct {
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

export interface IDbInsertProduct {
  insert: (params: NsDbInsertProduct.Input) => Promise<string>
}

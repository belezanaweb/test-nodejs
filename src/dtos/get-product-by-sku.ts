export type GetProductBySkuDTO = {
  sku: number
}

export type GetProductBySkuOutputDTO = {
  sku: number
  name: string
  inventory: {
    quantity: number
    warehouses: {
      locality: string
      quantity: number
      type: string
    }[]
  }
  isMarketable: boolean
}

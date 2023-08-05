export type UpdateProductDTO = {
  sku: number
  name: string
  inventory: {
    warehouses: {
      locality: string
      quantity: number
      type: string
    }[]
  }
}

export type UpdateProductInputDTO = {
  sku: number
  name: string
  inventory: {
    warehouses: {
      locality: string
      quantity: number
      type: string
    }[]
  }
}

export type UpdateProductOutputDTO = {
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

export type CreateProductInputDTO = {
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

export type CreateProductOutputDTO = void

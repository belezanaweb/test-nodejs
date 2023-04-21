interface ICreateProductDTO {
  sku: number
  name: string
  inventory: Inventory
}

interface Inventory {
  warehouses: Warehouses[]
}

interface Warehouses {
  locality: string
  quantity: number
  type: string
}


export { ICreateProductDTO }
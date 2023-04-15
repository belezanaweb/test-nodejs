type WarehouseDTO = {
  locality: string,
  quantity: number,
  type: string
}

type InventoryDTO = {
  quantity?: number,
  warehouses: WarehouseDTO[]
}

export type ProductDTO = {
  sku: string,
  name: string,
  inventory: InventoryDTO,
  isMarketable: boolean,
}

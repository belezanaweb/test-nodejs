export interface IProductModel {
  sku: number
  name: string
  inventory: IInventoryModel
  isMarketable?: boolean // Calculado!
}

export interface IInventoryModel {
  quantity?: number // Calculado!
  warehouses: IWarehouseModel[]
}

export interface IWarehouseModel {
  locality: string
  quantity: number
  type: 'PHYSICAL_STORE' | 'ECOMMERCE'
}

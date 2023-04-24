import { DisplayProduct } from '@modules/product/schemas/DisplayProductSchema'
import { Product, WarehouseTypes } from '@modules/product/schemas/ProductSchema'

export const mockProduct: Product = {
  sku: 12131,
  name: 'Kit La Roche-Posay Power Hidratação Duo',
  inventory: {
    warehouses: [
      { locality: 'SP', quantity: 12, type: WarehouseTypes.Ecommerce },
      { locality: 'RJ', quantity: 1, type: WarehouseTypes.PhysicalStore },
    ],
  },
}

export const mockDisplayProduct: DisplayProduct = {
  sku: 12131,
  name: 'Kit La Roche-Posay Power Hidratação Duo',
  inventory: {
    quantity: 13,
    warehouses: [
      { locality: 'SP', quantity: 12, type: WarehouseTypes.Ecommerce },
      { locality: 'RJ', quantity: 1, type: WarehouseTypes.PhysicalStore },
    ],
  },
  isMarketable: true,
}

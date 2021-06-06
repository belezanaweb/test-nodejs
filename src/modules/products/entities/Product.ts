import Inventory from './Inventory'

export default interface Product {
  sku: number,
  name: string,
  inventory: Inventory,
  isMarketable?: boolean
}

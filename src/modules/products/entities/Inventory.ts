import Warehouse from './Warehouse'

export default interface Inventory {
  quantity?: number,
  warehouses: Warehouse[]
}

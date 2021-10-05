import EntityBase from './base/EntityBase'
import WarehouseEntity from './WarehouseEntity'

export default class InventoryEntity extends EntityBase {
  constructor({ warehouses }) {
    super()
    this.warehouses = this.createWarehousesList(warehouses)
  }

  get quantity () {
    return this.warehouses ? this.warehouses.reduce( (acc, cur) => acc + cur.quantity, 0) : 0
  }

  createWarehousesList(items) {
    return items ? items.map(item => new WarehouseEntity(item)) : []
  }

  toJson() {
    const result = super.toJson()
    result.quantity = this.quantity
    return result
  }
}


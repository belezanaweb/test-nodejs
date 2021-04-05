import WarehousesEntity from './WarehousesEntity'

class InventoryEntity {
  constructor({ warehouses }) {
    this.quantity = 0
    this.warehouses = this.valueList(warehouses)
  }

  valueList(items) {
    const data = []
    for (const item of items) {
      data.push(new WarehousesEntity(item))
    }
    return data
  }
}

export default InventoryEntity

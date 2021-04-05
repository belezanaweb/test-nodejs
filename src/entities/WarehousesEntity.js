class WarehousesEntity {
  constructor({ locality, quantity, type }) {
    this.locality = locality || ''
    this.quantity = quantity || 0
    this.type = type || ''
  }
}

export default WarehousesEntity

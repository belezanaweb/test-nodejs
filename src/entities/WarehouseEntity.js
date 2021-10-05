import EntityBase from './base/EntityBase'

export default class WarehouseEntity extends EntityBase {
  constructor({ locality, quantity, type }) {
    super()
    this.locality = locality || ''
    this.quantity = quantity || 0
    this.type = type || ''
  }
}
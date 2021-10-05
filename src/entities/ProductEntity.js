import EntityBase from './base/EntityBase'
import InventoryEntity from "./InventoryEntity"

export default class ProductEntity extends EntityBase {
  constructor({ sku, name, inventory }) {
    super()
    this.sku = sku || 0
    this.name = name || ''
    this.inventory = new InventoryEntity(inventory)
  }

  get isMarketable () {
    return this.inventory && Boolean(this.inventory.quantity)
  }

  toJson() {
    let result = super.toJson()
    result.isMarketable = this.isMarketable
    return result
  }
}
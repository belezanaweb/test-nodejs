import InventoryEntity from "./InventoryEntity"
import { cloneDeep } from "lodash"

class ProductEntity {
  constructor({ sku, name, inventory }) {
    this.sku = sku
    this.name = name
    this.inventory = new InventoryEntity(inventory)
    this.isMarketable = false
  }

  toJson() {
    const result = cloneDeep(this)
    result.inventory.warehouses.forEach(({ quantity }) => {
      result.inventory.quantity += quantity
    })
    result.isMarketable = result.inventory.quantity ? true : false
    return result
  }
}

export default ProductEntity

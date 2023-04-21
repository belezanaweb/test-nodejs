import { Inventory } from "./interface/Inventory"

export class IProduct {
  constructor({
    sku,
    name,
    inventory,
  }: { sku: number, name: string, inventory: Inventory}) {
    this.sku = sku
    this.name = name
    this.inventory = inventory
    this.isDeleted = false
  }

  public sku: number
  public name: string
  public inventory: Inventory
  public isMarketable?: boolean
  public isDeleted?: boolean
}
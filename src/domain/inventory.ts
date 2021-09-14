import { Warehouse } from "./warehouse";

export class Inventory {
  public quantity?: number;
  public warehouses: Array<Warehouse>;

  constructor(inventory: Inventory) {
    this.quantity = inventory.quantity;
    this.warehouses = inventory.warehouses;
  }
}

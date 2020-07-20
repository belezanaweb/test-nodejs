import { Warehouse } from "./Warehouse";

export class Inventory {
  constructor(private warehouses: Warehouse[], private quantity?: number) {}

  public getWarehouses(): Warehouse[] {
    return this.warehouses;
  }

  public getQuantity(): number | undefined {
    return this.quantity;
  }

  public setQuantity(warehouses: Warehouse[]): number {
    let quantity = 0

    warehouses.forEach(warehouse => {
      quantity += warehouse.getQuantity()
    })

    return this.quantity = quantity
  }
}

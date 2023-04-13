import Warehouse from "src/entities/Warehouse";

export default class Inventory {
  private quantity: number;
  private warehouses: Warehouse[]

  constructor({ warehouses }: { warehouses: Warehouse[] }) {
    this.warehouses = warehouses
    this.quantity = 0;
  }

  public getQuantity() {
    this.quantity = this.warehouses.reduce((totalQuantity, warehouse) => totalQuantity + warehouse.getQuantity(), 0);
    return this.quantity
  }

  public getWarehouses(): Warehouse[] { return this.warehouses; }
}

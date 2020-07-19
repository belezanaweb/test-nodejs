import { Warehouse } from "./Warehouse";

export class Inventory {
  constructor(
    private warehouses: Warehouse[], 
    private quantity?: number) {}

  public getWarehouses(): Warehouse[] {
    return this.warehouses;
  }

  public getQuantity(): number | undefined{
    return this.quantity;
  }
}
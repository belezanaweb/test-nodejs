export enum WarehouseType {
  ecommerce = "ECOMMERCE",
  physicalStore = "PHYSICAL_STORE"
}

export default class Warehouse {
  private locality: string;
  private quantity: number;
  private type: WarehouseType

  constructor({ locality, quantity, type }: { locality: string, quantity: number, type: WarehouseType }) {
    this.locality = locality;
    this.quantity = quantity;
    this.type = type
  }

  public getLocality(): string { return this.locality; }
  public getQuantity(): number { return this.quantity; }
  public getType(): WarehouseType { return this.type; }
}

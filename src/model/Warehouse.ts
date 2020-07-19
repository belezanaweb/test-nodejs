import { InvalidParameterError } from "../errors/InvalidParameterError";

export class Warehouse {
  constructor(
    private locality: string,
    private quantity: number,
    private type: string
  ) {}

  public getLocality(): string {
    return this.locality;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getType(): string {
    return this.type;
  }
}

export const stringToWarehouseType = (type: string): WarehouseType => {
  switch (type) {
    case "ECOMMERCE":
      return WarehouseType.ECOMMERCE;
    case "PHYSICAL_STORE":
      return WarehouseType.PHYSICAL_STORE;
    default:
      throw new InvalidParameterError("Invalid warehouse type");
  }
};

export enum WarehouseType {
  ECOMMERCE = "ECOMMERCE",
  PHYSICAL_STORE = "PHYSICAL_STORE",
}

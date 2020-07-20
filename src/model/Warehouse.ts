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
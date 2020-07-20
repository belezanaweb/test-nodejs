import { Inventory } from "./Inventory";

export class Product {
  constructor(
    private sku: number,
    private name: string,
    private inventory: Inventory,
    private isMarketable?: boolean
  ) {}

  public getSku(): number {
    return this.sku;
  }

  public getName(): string {
    return this.name;
  }

  public getInventory(): Inventory {
    return this.inventory;
  }

  public setIsMarketable(quantity: number): any {
    if (quantity <= 0) {
      return (this.isMarketable = false);
    }

    return (this.isMarketable = true);
  }
}

import Inventory from "src/domain/entities/Inventory";

export default class Product {
  private sku: string;
  private name: string;
  private inventory: Inventory;
  private isMarketable: boolean;

  constructor({ sku, name, inventory }: { sku: string, name: string, inventory: Inventory }) {
    this.sku = sku;
    this.name = name;
    this.inventory = inventory;
    this.isMarketable = false;
  }

  public getSku(): string { return this.sku }
  public getName(): string { return this.name }
  public getInventory(): Inventory { return this.inventory }
  public getIsMarketable(): boolean {
    this.isMarketable = false
    if (this.inventory.getQuantity() > 0) {
      this.isMarketable = true;
    }
    return this.isMarketable;
  }
}

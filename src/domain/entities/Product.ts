import Inventory from "src/domain/entities/Inventory";

export default class Product {
  private sku: string;
  private name: string;
  private inventory: Inventory;
  readonly minimumQuantityToBeMarketable: number;

  constructor({ sku, name, inventory }: { sku: string, name: string, inventory: Inventory }) {
    this.sku = sku;
    this.name = name;
    this.inventory = inventory;
    this.minimumQuantityToBeMarketable = 0;
  }

  public getSku(): string { return this.sku }
  public getName(): string { return this.name }
  public getInventory(): Inventory { return this.inventory }
  public getIsMarketable(): boolean { return this.inventory.getQuantity() > this.minimumQuantityToBeMarketable }
}

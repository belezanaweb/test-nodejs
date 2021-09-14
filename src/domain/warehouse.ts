export class Warehouse {
  public locality: string;
  public quantity: number;
  public type: 'ECOMMERCE' | 'PHYSICAL_STORE';
  public productId?: number

  constructor(warehouse: Warehouse) {
    this.locality = warehouse.locality;
    this.quantity = warehouse.quantity;
    this.type = warehouse.type;
    this.productId = warehouse.productId;
  }
}

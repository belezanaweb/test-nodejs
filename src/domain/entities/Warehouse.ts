export default class Warehouse {
  locality: string;
  quantity: number;
  type: string;

  constructor(locality: string, quantity: number, type: string) {
    this.locality = locality;
    this.quantity = quantity;
    this.type = type;
  }
}

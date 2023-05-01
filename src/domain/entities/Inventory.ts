import Warehouse from "./Warehouse";

export default class Inventory {
  warehouses: Warehouse[];
  quantity?: number;

  constructor(warehouses: Warehouse[]) {
    this.warehouses = warehouses;
    this.quantity = this.getTotalQuantityInWarehousesStock();
  }

  getTotalQuantityInWarehousesStock(): number {
    return this.warehouses.reduce((total, warehouse) => total + warehouse.quantity, 0);
  }
}

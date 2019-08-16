import Inventory from '../interfaces/Inventory';
import Warehouse from '../interfaces/Warehouse';

export default class InventoryEntity implements Inventory {
  quantity: number;

  warehouses: Warehouse[];

  constructor({ warehouses }: Inventory) {
    this.warehouses = warehouses;
    this.quantity = warehouses.reduce((total, wh): number => (total += wh.quantity), 0);
  }
}

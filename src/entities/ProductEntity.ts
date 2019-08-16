import Inventory from '../interfaces/Inventory';
import Product from '../interfaces/Product';
import InventoryEntity from './InventoryEntity';

export default class ProductEntity implements Product {
  sku: number;

  name: string;

  inventory: Inventory;

  isMarketable: boolean;

  constructor({ sku, name, inventory }: Product) {
    this.sku = sku;
    this.name = name;
    this.inventory = new InventoryEntity(inventory);
    this.isMarketable = this.inventory.quantity > 0;
  }
}

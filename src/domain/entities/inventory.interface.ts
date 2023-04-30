import Warehouse from './warehouse.interface';

interface Inventory {
  quantity?: number;
  warehouses: Warehouse[];
}

export default Inventory;

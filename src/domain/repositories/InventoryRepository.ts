import Inventory from "src/domain/entities/Inventory";
import Warehouse from "../entities/Warehouse";

export default interface InventoryRepository {
  create({ warehouses }: { warehouses: Warehouse[] }): Promise<Inventory>
}

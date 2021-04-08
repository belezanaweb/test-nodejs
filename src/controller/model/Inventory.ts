import { WarehouseInterface } from "./Warehouse";

export interface InventoryInterface {
    quantity?: number;
    warehouses: WarehouseInterface[];
}
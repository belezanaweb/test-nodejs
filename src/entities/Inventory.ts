import { Warehouse, WarehouseInterface } from "./Warehouse"

export interface InventoryInterface {
    quantity?: number;
    warehouses: WarehouseInterface[];
}

export interface Inventory {
    quantity?: number;
    warehouses: Warehouse[];
}
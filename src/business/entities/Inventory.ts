import { Warehouse } from "./Warehouse"

export interface Inventory {
    quantity: number;
    warehouses: Warehouse[];
}
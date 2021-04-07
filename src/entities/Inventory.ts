import { Warehouse } from "./Warehouse"

export interface Inventory {
    quantity: string;
    warehouses: Warehouse[];
}
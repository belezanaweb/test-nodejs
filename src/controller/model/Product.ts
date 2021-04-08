import { InventoryInterface } from "./Inventory";


export interface ProductInputDTO {
    sku: number;
    name: string;
    inventory: InventoryInterface;
}
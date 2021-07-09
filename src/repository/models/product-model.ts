import { WarehouseModel } from "./warehouse-model";

export interface ProductModel {
    sku: number;
    name: string;
    inventory: {
        warehouses: WarehouseModel[];
    }
}
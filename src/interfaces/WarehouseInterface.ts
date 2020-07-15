import { TypeWarehouse } from "../enums/TypeWarehouse";

export interface WarehouseInterface {
    locality: string,
    quantity: number,
    type: TypeWarehouse
}
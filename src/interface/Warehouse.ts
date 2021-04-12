  
import { WarehouseType } from "../enums/WarehouseType"

export interface WarehouseInterface {
    locality: string,
    quantity: number,
    type: WarehouseType
}

  
import { WarehouseType } from "../enum/WarehouseType"

export interface WarehouseInterface {
    locality: string,
    quantity: number,
    type: WarehouseType
}

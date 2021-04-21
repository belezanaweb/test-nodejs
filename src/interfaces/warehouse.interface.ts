import { warehouseType } from '../enums/warehouse.type'

export interface IWarehouse {   
    locality: string,
    type: warehouseType,
    quantity: number
}
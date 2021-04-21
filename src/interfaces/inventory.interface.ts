import { IWarehouse } from './warehouse.interface'

export interface IInventoryReponse {   
    quantity: number,
    warehouse: IWarehouse[]
}

export interface IInventoryDB { 
    warehouse: IWarehouse[]
}


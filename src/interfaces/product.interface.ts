import { IInventoryReponse } from './inventory.interface'

export interface IProduct {   
    sku: number,
    name: string,
    inventory: IInventoryReponse,
    isMarketable: boolean
}

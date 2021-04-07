import { Inventory } from "./Inventory"

export class Product {
    constructor(
        private sku: string,
        private name: string,
        private inventory: Inventory,
        private isMarketable?: boolean
    ) { }

    public getSku = (): string => this.sku
    public getName = (): string => this.name
    public getInventory = (): Inventory => this.inventory
    public getIsMarketable = (): boolean | undefined => this.isMarketable
}




export interface ProductInputDTO {
    sku: number;
    name: string;
    inventory: Inventory;
}
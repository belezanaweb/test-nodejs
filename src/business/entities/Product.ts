import { Inventory } from "./Inventory"

export class Product {
    constructor(
        private sku: number,
        private name: string,
        private inventory: Inventory,
        private isMarketable?: boolean
    ) { }

    public getSku = (): number => this.sku
    public getName = (): string => this.name
    public getInventory = (): Inventory => this.inventory
    public getIsMarketable = (): boolean | undefined => this.isMarketable

    public setIsMarketable(): void {
        if(this.inventory.quantity > 0){
            this.isMarketable = true
        }
    }

    public setInventoryQuantity(): void {
        this.inventory.quantity += 1
    }
}


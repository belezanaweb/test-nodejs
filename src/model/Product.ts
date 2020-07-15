import { Inventory } from "./Invetory"

export class Product {
    constructor(
        private sku: number,
        private name: string,
        private inventory: Inventory,
        private isMarketable?: boolean
    ) {}

    public getSku(): number {
        return this.sku
    }

    public getName(): string {
        return this.name
    }

    public getInventory(): Inventory {
        return this.inventory
    }

    public setIsMarketable(): void {
        this.isMarketable = this.inventory.getQuantity() as number > 0
    }
}


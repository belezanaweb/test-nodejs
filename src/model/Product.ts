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

    public setMarketable(): void {
        this.isMarketable = this.getInventory().getQuantity() as number > 0
        this.getInventory().calculateQuantity();
    }
}


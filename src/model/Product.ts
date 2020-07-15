import { Inventory } from "./Invetory"

export class Product {
    constructor(
        private sku: number,
        private name: string,
        private inventory: Inventory
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
}


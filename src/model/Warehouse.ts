import { TypeWarehouse } from "../enums/TypeWarehouse"

export class Warehouse {
    constructor(
        private locality: string,
        private quantity: number,
        private type: TypeWarehouse
    ) {}

    public getLocality(): string {
        return this.locality
    }

    public getQuantity(): number {
        return this.quantity
    }

    public getType(): TypeWarehouse {
        return this.type
    }
}
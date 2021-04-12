import { WarehouseType } from "../enums/WarehouseType"

export class Warehouse {
    constructor(
        private locality: string,
        private quantity: number,
        private type: WarehouseType
    ) {}

    public getLocality(): string {
        return this.locality
    }

    public getQuantity(): number {
        return this.quantity
    }

    public getType(): WarehouseType {
        return this.type
    }
}
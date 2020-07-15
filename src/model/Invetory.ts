import { Warehouse } from './Warehouse'; 

export class Inventory {
    constructor(
        private warehouses: Warehouse[],
        private quantity?: number
    ) {}

    public getQuantity(): number | undefined {
        return this.quantity
    }

    public getWarehouses(): Warehouse[] {
        return this.warehouses
    }
}
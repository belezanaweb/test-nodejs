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

    public calculateQuantity(): void {
        let quantity = 0;

        this.warehouses.forEach((warehouse) => {
            quantity += warehouse.getQuantity()
        })

        this.quantity = quantity;
    }
}

import Warehouse from './Warehouse'

export default class Inventory {
    quantity: number | undefined;
    warehouses: Warehouse[] | undefined;

    constructor()
    constructor(quantity:number, warehouse: Warehouse[])
    constructor(quantity?:number, warehouse?: Warehouse[]){
        this.quantity = quantity;
        this.warehouses = warehouse;
    }
    
}
import Warehouse from './Warehouse'

export default class Inventory {
    _quantity: number | undefined;
    _warehouses: Warehouse[] | undefined;

    constructor()
    constructor(quantity:number, warehouse: Warehouse[])
    constructor(quantity?:number, warehouse?: Warehouse[]){
        this._quantity = quantity;
        this._warehouses = warehouse;
    }
    
}
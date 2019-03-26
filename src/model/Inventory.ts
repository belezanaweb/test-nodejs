import Warehouse from './Warehouse'

export default class Inventory {
    private _quantity: number;
    private _warehouse: Warehouse;

    constructor(quantity:number, warehouse: Warehouse){
        this._quantity = quantity;
        this._warehouse = warehouse;
    }


    public set quantity(quantity: number){
        this._quantity = quantity;
    }

    
    public get quantity() : number {
        return this._quantity;
    }

    public set warehouse(warehouse: Warehouse){
        this._warehouse = warehouse;
    }

    public get warehouse() : Warehouse {
        return this._warehouse;
    }
    
}
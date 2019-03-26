import Inventory from './Inventory';

export default class Produto {
    private _sku : number;
    private _name: string;
    private _inventory: Inventory;
    private _isMarketable : boolean;

    constructor(sku:number, name:string , inventory: Inventory, isMarketable : boolean){
        this._sku = sku;
        this._name = name;
        this._inventory = inventory;
        this._isMarketable = isMarketable;
    }
}
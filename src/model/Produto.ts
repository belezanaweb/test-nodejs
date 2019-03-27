import Inventory from './Inventory';

export default class Produto {
    _sku : number|undefined;
    _name: string|undefined;
    _inventory: Inventory|undefined;
    _isMarketable : boolean|undefined;
    
    constructor()
    constructor(sku:number, name:string , inventory: Inventory, isMarketable : boolean)
    constructor(sku?:number, name?:string , inventory?: Inventory, isMarketable? : boolean){
        this._sku = sku;
        this._name = name;
        this._inventory = inventory;
        this._isMarketable = isMarketable;
    }

   
}
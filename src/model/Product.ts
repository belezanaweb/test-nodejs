import Inventory from './Inventory';

export default class Product {
    sku : number|undefined;
    name: string|undefined;
    inventory: Inventory|undefined;
    isMarketable : boolean|undefined;
    
    constructor()
    constructor(sku:number, name:string , inventory: Inventory, isMarketable : boolean)
    constructor(sku?:number, name?:string , inventory?: Inventory, isMarketable? : boolean){
        this.sku = sku;
        this.name = name;
        this.inventory = inventory;
        this.isMarketable = isMarketable;
    }

   
}
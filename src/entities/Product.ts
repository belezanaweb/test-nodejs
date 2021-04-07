import { CustomError } from "../error/CustomError";

export class Post {

    constructor(
        private sku:string,
        private name:string,
        private inventory:string[],
        
    ) {}
    
    public getSku = ():string => this.sku
    public getName = ():string => this.name
    public getInventory = ():string[] => this.inventory
}
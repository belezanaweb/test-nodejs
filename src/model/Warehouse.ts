export default class Warehouse {
    locality : string | undefined;
    quantity : number | undefined;
    type: string | undefined;

    constructor()
    constructor(locality : string,  quantity : number, type: string)
    constructor(locality? : string,  quantity? : number, type?: string){
        this.locality = locality;
        this.quantity = quantity;
        this.type = type;
    }
}
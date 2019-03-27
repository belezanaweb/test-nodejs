export default class Warehouse {
    _locality : string | undefined;
    _quantity : number | undefined;
    _type: string | undefined;

    constructor()
    constructor(locality : string,  quantity : number, type: string)
    constructor(locality? : string,  quantity? : number, type?: string){
        this._locality = locality;
        this._quantity = quantity;
        this._type = type;
    }
}
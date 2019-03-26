export default class Warehouse {
    private _locality : string;
    private _quantity : number;
    private _type: string;

    constructor(locality : string,  quantity : number, type: string){
        this._locality = locality;
        this._quantity = quantity;
        this._type = type;
    }
}
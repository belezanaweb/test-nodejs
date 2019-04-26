import { BrasillianStates } from "./BrasillianStatesEnum";
import { WareHouseTypes } from "./WareHouseTypesEnum";

export class WareHouse{

    public locality:BrasillianStates;
    public quantity:number;
    public type: WareHouseTypes;

    constructor(locality, quantity, type){
        this.locality = locality;
        this.quantity = quantity;
        this.type = type;
    }
}

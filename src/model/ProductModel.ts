import { WareHouse } from "./WareHouseModel";

export class ProductModel{

    public sku:number;
    public name:String;
    public inventory: { warehouses:WareHouse[], quantity?:number };

    constructor(sku: number, name: String, inventory?: { warehouses: WareHouse[]; quantity?: number; }){
        this.sku = sku;
        this.name = name;
        this.inventory = inventory ? inventory : { warehouses:[]};
    }

}
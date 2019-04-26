import { WareHouse } from "./WareHouseModel";

export class ProductModel{

    public sku:number;
    public name:String;
    public warehouses: WareHouse[];

    constructor(sku: number, name: String, inventory?: { warehouses:WareHouse[]}){
        this.sku = sku;
        this.name = name;
        this.warehouses = inventory ? inventory['warehouses'] : [];
    }

}
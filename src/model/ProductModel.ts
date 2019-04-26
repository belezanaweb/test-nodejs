import { WareHouse } from "./WareHouseModel";

export class ProductModel{

    public sku:String;
    public name:String;
    public warehouses: WareHouse[];

    constructor(sku, name, inventory){
        this.sku = sku;
        this.name = name;
        this.warehouses = inventory.warehouses || [];
    }

}
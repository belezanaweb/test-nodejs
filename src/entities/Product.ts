export class Product {

    constructor(
        private sku: string,
        private name: string,
        private inventory: Inventory,
        private isMarketable?:boolean
    ) { }

    public getSku = (): string => this.sku
    public getName = (): string => this.name
    public getInventory = (): Inventory => this.inventory
    public getIsMarketable = ():boolean | undefined => this.isMarketable
}

interface Inventory {
    quantity: string;
    warehouses: Warehouse[];
}

interface Warehouse {
    locality: string;
    quantity: number;
    type: WAREHOUSE_TYPE;
}

enum WAREHOUSE_TYPE {
    PHYSICAL_STORE = "PHYSICAL_STORE",
    ECOMMERCE = "ECOMMERCE"
}
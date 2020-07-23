export class Product{
    constructor(
        private sku: number,
        private name: string,
        private inventory: Inventory,
        private isMarketable: boolean
    ){}

    public getSku(): number{
        return this.sku;
    }

    public getName(): string{
        return this.name;

    }
    public setName(name: string | undefined): void {
        if(name){
            this.name = name
        }else{
            this.name = this.getName()
        }
    }
    
    public getInventory(): Inventory{
        return this.inventory;

    }
    
    public setInventory(inventory: Inventory | undefined): void {
        if(inventory){
            this.inventory = inventory
        }else{
            this.inventory = this.getInventory()
        }
    }
    
    public getIsMarketable(): boolean{
        return this.isMarketable;
    }

    public setIsMarketable(isMarketable: boolean | undefined): void {
        if(isMarketable){
            this.isMarketable = isMarketable
        }else{
            this.isMarketable = this.getIsMarketable()
        }
    }


}

export class Inventory{
    constructor(
    private quantity: number,
    private warehouses: Warehouses[],
    ){}
    
    public getQuantity(): number{
        return this.quantity;
    }

    public getWarehouses(): Warehouses[]{
        return this.warehouses
    }
}

export class Warehouses{
    constructor(
    private locality: string,
    private quantity: number,
    private type: string
    ){}

    public getLocality(): string{
        return this.locality
    }

    public getQuantity(): number{
        return this.quantity
    }

    public getType(): string{
        return this.type
    }
}


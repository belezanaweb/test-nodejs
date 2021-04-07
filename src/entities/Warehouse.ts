export enum WAREHOUSE_TYPES {
    PHYSICAL_STORE = "PHYSICAL_STORE",
    ECOMMERCE = "ECOMMERCE"
}

export class Warehouse {
    private type:WAREHOUSE_TYPES

    constructor(
        private locality: string,
        private quantity: number,
        type: string
    ) {
        if(type === WAREHOUSE_TYPES.PHYSICAL_STORE) {
            this.type = WAREHOUSE_TYPES.PHYSICAL_STORE
        } else if (type === WAREHOUSE_TYPES.ECOMMERCE) {
            this.type = WAREHOUSE_TYPES.ECOMMERCE
        } else {
            throw new Error("Invalid warehouse type. Choose wheter it is \'PHYSICAL_STORE\' or \'ECOMMERCE\'")
        }
     }

    

    public getLocality = (): string => this.locality
    public getQuantity = (): number => this.quantity
    public getType = (): string => this.type

}



import { CustomError } from "../error/CustomError"

export enum WarehouseType {
    PHYSICAL_STORE = "PHYSICAL_STORE",
    ECOMMERCE = "ECOMMERCE"
}

export class Warehouse {

    constructor(
        private locality: string,
        private quantity: number,
        private type: WarehouseType
    ) {}

    static stringToType(input: string): WarehouseType {
        switch (input.toUpperCase()) {
           case "ECOMMERCE":
              return WarehouseType.ECOMMERCE;
           case "PHYSICAL_STORE":
              return WarehouseType.PHYSICAL_STORE;
           default:
              throw new CustomError(422,"Invalid warehouse type. Please choose 'PHYSICAL_STORE' or 'ECOMMERCE'");
        }
     }

    public getLocality = (): string => this.locality
    public getQuantity = (): number => this.quantity
     public getType = (): WarehouseType => this.type


}

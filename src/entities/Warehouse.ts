import { CustomError } from "../error/CustomError";

export enum WarehouseType {
    PHYSICAL_STORE = "PHYSICAL_STORE",
    ECOMMERCE = "ECOMMERCE"
}

export class Warehouse {

    constructor(
        public locality: string,
        public quantity: number,
        public type: WarehouseType
    ) {}

    static stringToType(input: string): WarehouseType {
        switch (input.toUpperCase()) {
           case "ECOMMERCE":
              return WarehouseType.ECOMMERCE;
           case "PHYSICAL_STORE":
              return WarehouseType.PHYSICAL_STORE;
           default:
              throw new CustomError(422,"Invalid type");
        }
     }

}

export interface WarehouseInterface {
    locality: string;
    quantity: number;
    type: string;
}

// import { Warehouse, WarehouseInterface } from "./Warehouse";

// export interface InventoryInterface {
//   warehouses: WarehouseInterface[];
// }

// export class Inventory {
//   constructor(
//     public readonly warehouses: Warehouse[], 
//     public readonly quantity?: number
//       ) {}

//   public getQuantity(): number | undefined{
//     return this.quantity;
//   }

//   public getWarehouses(): Warehouse[]{
//       return this.warehouses
//   }

//   public quantityCalculate(): void{
//       let quantity = 0;
//       this.warehouses.forEach((warehouse)=>{
//           quantity += warehouse.getQuantity()
//       })

//       this.quantity = quantity;
//   }
// }
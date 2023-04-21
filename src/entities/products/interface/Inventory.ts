import { Warehouses } from "./Warehouses"

export interface Inventory {
  quantity?: number
  warehouses: Warehouses[]
}
import { Product } from "../model/Product"

export interface ProductHashtable {
    [index: number]: Product | undefined
}
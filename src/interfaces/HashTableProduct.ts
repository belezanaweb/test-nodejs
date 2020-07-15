import { Product } from "../model/Product";

export interface HashTableProduct {
    [index: number]: Product | undefined
}
import { Product } from "../model/Product"
import { ProductHashtable } from "../interface/ProductHashtable"

export class ProductDb {

    private productHashTable: ProductHashtable = {}

    public createProduct(product: Product): void {
        this.productHashTable[product.getSku()] = product
    }

}
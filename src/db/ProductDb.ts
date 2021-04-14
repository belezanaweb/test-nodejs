import { Product } from "../model/Product"
import { ProductHashtable } from "../interface/ProductHashtable"

export class ProductDb {

    private productHashTable: ProductHashtable = {}

    public createProduct(product: Product): void {
        this.productHashTable[product.getSku()] = product
    }

    public findBySku(sku: number): Product | undefined {
        return this.productHashTable[sku]
    }

    public editProduct(sku: number, product: Product): void {
        this.productHashTable[sku] = product;
    }
}
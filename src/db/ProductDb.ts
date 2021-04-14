import { Product } from "../model/Product"
import { ProductHashtable } from "../interface/ProductHashtable"

export class ProductDb {

    private ProductHashtable: ProductHashtable = {}

    public createProduct(product: Product): void {
        this.ProductHashtable[product.getSku()] = product
    }

    public findBySku(sku: number): Product | undefined {
        return this.ProductHashtable[sku]
    }

    public editProduct(sku: number, product: Product): void {
        this.ProductHashtable[sku] = product;
    }

    public deleteProduct(sku: number): void {
        this.ProductHashtable[sku] = undefined
    }
}
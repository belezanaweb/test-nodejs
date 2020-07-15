import { Product } from "../model/Product";
import { HashTableProduct } from "../interfaces/HashTableProduct"

export class ProductDataBase {

    private productHashTable: HashTableProduct = {}

    public createProduct(product: Product): void {
        this.productHashTable[product.getSku()] = product;
    }

    public findBySku(sku: number): Product {
        return this.productHashTable[sku];
    }

    public editProduct(sku: number, product: Product): void {
        this.productHashTable[sku] = product;
    }
}
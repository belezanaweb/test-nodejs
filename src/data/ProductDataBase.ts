import { Product } from "../model/Product";
import { HashTableProduct } from "../interfaces/ProductInterface"

export class ProductDataBase {

    private productHasheTable: HashTableProduct = {}

    public createProduct(product: Product): void {
        this.productHasheTable[product.getSku()] = product;
    }

    public findBySku(sku: number): Product {
        return this.productHasheTable[sku];
    }
}
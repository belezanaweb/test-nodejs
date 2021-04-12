import { Product } from "../model/Product";
import { HashTableProduct } from "../interface/HashTableProduct"

export class ProductDataBase {

    private productHashTable: HashTableProduct = {}

    public createProduct(product: Product): void {
        this.productHashTable[product.getSku()] = product;
    }

}
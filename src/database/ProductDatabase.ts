import { Product } from "../entities/Product";

export class ProductDatabase {
    private products: Product[] =[]

    public createProduct(product: Product): void {
        this.products.push(product)
    }
    
}
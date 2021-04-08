import { Product } from "../entities/Product";

export class ProductDatabase {
    private products: Product[] =[]

    public createProduct(product: Product) {
        this.products.push(product)
    }
    
    public getProductBySku(sku: number): Product | undefined {
        return this.products.find(product => product.getSku() === sku)
    }
}
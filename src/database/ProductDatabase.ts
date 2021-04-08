import { Product } from "../business/entities/Product";

export class ProductDatabase {
    private products: Product[] =[]

    public createProduct(product: Product) {
        this.products.push(product)
    }
    
    public getProductBySku(sku: number): Product | undefined {
        return this.products.find(product => product.getSku() === sku)
    }

    public editProduct(sku: number, product: Product) {

    }

    public deleteProduct(sku: number) {
        const index = this.products.findIndex(product => product.getSku() === sku)
        this.products.splice(index, 1)
        
    }
}
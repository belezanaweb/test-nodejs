import { Product } from "../business/entities/Product";
import { CustomError } from "../business/error/CustomError";

export class ProductDatabase {
    private products: Product[] =[]

    public createProduct(product: Product) {
        try {
            this.products.push(product)
        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
        
    }
    
    public getProductBySku(sku: number): Product | undefined {
        try {
        return this.products.find(product => product.getSku() === sku)
        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public editProduct(sku: number, product: Product) {
        try {
            
        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public deleteProduct(sku: number) {
        try {
        const index = this.products.findIndex(product => product.getSku() === sku)
        this.products.splice(index, 1)
        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}
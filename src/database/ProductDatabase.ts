import { Product } from "../business/entities/Product";
import { CustomError } from "../business/error/CustomError";

export class ProductDatabase {
    private products: Product[] = []

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

    public updateProduct(sku: number, product: Product) {
        try {
            const index = this.products.findIndex(product => product.getSku() === sku)

            if (index === -1) {
                throw new CustomError(404, "Product not found")
            }

            this.products[index] = product

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public deleteProduct(sku: number) {
        try {
            const index = this.products.findIndex(product => product.getSku() === sku)

            if (index === -1) {
                throw new CustomError(404, "Product not found")
            }

            this.products.splice(index, 1)
        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}
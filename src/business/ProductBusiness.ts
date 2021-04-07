import { ProductDatabase } from "../database/ProductDatabase"
import { Product, ProductInputDTO } from "../entities/Product"
import { CustomError } from "../error/CustomError"

const productDatabase = new ProductDatabase()

export class ProductBusiness {

    public createProduct = async (
        input: ProductInputDTO,
    ): Promise<void> => {
        try {
            if (!input.sku || !input.name || !input.inventory) {
                throw new CustomError(422, "Missing properties")
            }

            const newProduct: Product = new Product(input.sku, input.name, input.inventory)

            productDatabase.createProduct(newProduct)

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }

    }

}
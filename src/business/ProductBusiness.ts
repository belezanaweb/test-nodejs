import { ProductInputDTO } from "../entities/Product"
import { CustomError } from "../error/CustomError"

export class ProductBusiness {

    public createProduct = async (
        input: ProductInputDTO,
    ): Promise<void> => {
        try {
            if (!input.name || !input.sku || !input.inventory) {
                throw new CustomError(422, "Missing properties")
            }


        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }

    }

}
import ProductDatabase from "../data/ProductDatabase";

export class ProductBusiness {

    public async createProduct(name:string) {
        try {
            await ProductDatabase.createProduct(name)

            return { message: "Sucessfull product created" };
        }
        catch (error) {
            console.log(error)
        }
    }
}

export default new ProductBusiness()
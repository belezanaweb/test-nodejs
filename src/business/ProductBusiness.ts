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

    public async editProductBySku(sku:number, id:number, quantity:number) {
        try {
            await ProductDatabase.editProductBySku(sku, id, quantity)

            return { message: "Sucessfull product edited" };
        }
        catch (error) {
            console.log(error)
        }
    }

    public async delProductBySku(sku:number) {
        try {
            await ProductDatabase.delProductBySku(sku)

            return { message: "Sucessfull product deleted" };
        }
        catch (error) {
            console.log(error)
        }
    }
}

export default new ProductBusiness()
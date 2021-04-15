import BaseDataBase from "./BaseDatabase";
import BaseDatabase from "./BaseDatabase";

export class ProductDatabase extends BaseDataBase {

    public async createProduct(name:string): Promise<void> {
        try {
            await BaseDataBase.connection.raw(`
                INSERT INTO ${BaseDatabase.PRODUCT_TABLE} (name)
                VALUES (
                    "${name}"
                )
            `)
        }
        catch (error) {
            console.log(error)
        }
    }
}

export default new ProductDatabase()
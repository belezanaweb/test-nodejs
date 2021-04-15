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

    public async editProductBySku(sku:number, id:number, quantity:number): Promise<void> {
        try {
            const warehouse = await BaseDataBase.connection.raw(`
                SELECT * FROM ${BaseDatabase.RELATIONAL_TABLE}
                WHERE product_sku=${sku} AND warehouse_id=${id};
            `)

            if(warehouse[0].length===0) {
                await BaseDataBase.connection.raw(`
                    INSERT INTO ${BaseDatabase.RELATIONAL_TABLE}
                    VALUES (
                        ${sku},
                        ${id},
                        ${quantity}
                    )
                `)
            } else {
                await BaseDataBase.connection.raw(`
                    UPDATE ${BaseDatabase.RELATIONAL_TABLE}
                    SET quantity=${quantity}
                    WHERE product_sku=${sku} AND warehouse_id=${id};
            `)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
}

export default new ProductDatabase()
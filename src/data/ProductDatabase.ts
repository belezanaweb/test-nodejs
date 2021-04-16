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

    public async delProductBySku(sku:number): Promise<void> {
        try {
            await BaseDataBase.connection.raw(`
                DELETE FROM ${BaseDatabase.RELATIONAL_TABLE}
                WHERE product_sku=${sku};
            `)

            await BaseDataBase.connection.raw(`
                DELETE FROM ${BaseDatabase.PRODUCT_TABLE}
                WHERE sku=${sku};
            `)
        }
        catch (error) {
            console.log(error)
        }
    }

    public async getProductBySku(sku:number): Promise<any> {
        try {
            const result = await BaseDataBase.connection.raw(`
                SELECT * FROM ${BaseDatabase.RELATIONAL_TABLE} rel
                LEFT JOIN ${BaseDatabase.WAREHOUSE_TABLE} wh ON rel.warehouse_id = wh.id
                LEFT JOIN ${BaseDatabase.PRODUCT_TABLE} pr ON rel.product_sku = pr.sku
                WHERE product_sku=${sku};
            `)

            const newResult = await BaseDataBase.connection.raw(`
                SELECT * FROM ${BaseDatabase.PRODUCT_TABLE}
                WHERE sku=${sku};
            `)

            if (result[0].length>0){
                return (result[0])
            } else {
                return (newResult[0])
            }
        }
        catch (error) {
            console.log(error)
        }
    }
}

export default new ProductDatabase()
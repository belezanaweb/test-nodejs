import  BaseDatabase from "../src/data/BaseDatabase"

export class MySqlSetup extends BaseDatabase{
    public async createTable(): Promise<void> {
    try {
        await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDatabase.PRODUCT_TABLE} (
                sku INT(5) PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL
            )
        `)
        
        await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDatabase.WAREHOUSE_TABLE} (
                id INT(11) PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                locality VARCHAR(255) NOT NULL,
                type ENUM("ECOMMERCE","PHYSICAL_STORE") NOT NULL
            )
        `)

        await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDatabase.RELATIONAL_TABLE} (
                product_sku INT(5) NOT NULL,
                warehouse_id INT(11) NOT NULL,
                quantity INT(3) NOT NULL,
                FOREIGN KEY (product_sku) REFERENCES ${BaseDatabase.PRODUCT_TABLE}(sku),
                FOREIGN KEY (warehouse_id) REFERENCES ${BaseDatabase.WAREHOUSE_TABLE}(id)
            )
        `)

        await BaseDatabase.connection.raw(`
            INSERT INTO ${BaseDatabase.WAREHOUSE_TABLE} (name, locality, type)
            VALUES("Loja Virtual","SP","ECOMMERCE"),
            ("Loja Física","MOEMA","PHYSICAL_STORE");
        `)

        console.log("MySql setup completed!")
        BaseDatabase.destroyConnection()

        } catch (error) {
            console.log(error)
        } 
    }
}

new MySqlSetup().createTable()
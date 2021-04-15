import dotenv from "dotenv";
import knex from "knex";

dotenv.config();

export default class BaseDataBase {

   protected static PRODUCT_TABLE = "Boticario_product"
   protected static WAREHOUSE_TABLE = "Boticario_warehouse"
   protected static RELATIONAL_TABLE = "Boticario_relational"

   protected static connection = knex({
      client: "mysql",
      connection: {
         host: process.env.DB_HOST,
         port: 3306,
         user: process.env.DB_USER,
         password: process.env.DB_PASSWORD,
         database: process.env.DB_NAME,
      },
   });

   public static async destroyConnection(): Promise<void> {
      await BaseDataBase.connection.destroy();
   }
}
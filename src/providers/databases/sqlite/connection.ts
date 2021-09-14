import { Connection, ConnectionOptions, createConnection } from "typeorm"
import { ProductDatabaseEntity } from "../entities/product/product-database.entity";
import { WarehouseDatabaseEntity } from "../entities/warehouse/warehouse-database.entity";

class ConnectionSQLite {

  private static connection: Connection;

  /**
   * Builder
   * @returns
   */
  static async Builder() {
    const options: ConnectionOptions = {
      type: "sqlite",
      database: `src/providers/databases/sqlite/database.sqlite`,
      entities: [
        ProductDatabaseEntity,
        WarehouseDatabaseEntity
      ],
      logging: false
    }

    if (!ConnectionSQLite.connection) {
      ConnectionSQLite.connection = await createConnection(options);
    }
    return ConnectionSQLite.connection;
  }
}

export { ConnectionSQLite }

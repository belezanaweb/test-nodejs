import { getCustomRepository } from "typeorm";
import { Warehouse } from "../../../domain/warehouse";
import { WarehouseDatabaseEntity } from "../../../providers/databases/entities/warehouse/warehouse-database.entity";
import { WarehouseDatabaseRepository } from "../../../providers/databases/entities/warehouse/warehouse-database.repository";
import { IWarehouseRepository } from "../../iwarehouse.repository";

export class WarehouseRepository implements IWarehouseRepository {
  /**
   * Save
   * @param listWarehouse
   */
  async save(listWarehouse: Array<Warehouse>): Promise<void> {
    const repository = getCustomRepository(WarehouseDatabaseRepository);
    await repository.save(listWarehouse);
  }

  /**
   * Remove By SKU
   * @param sku
   */
  async removeBySku(sku: number): Promise<void> {
    const repository = getCustomRepository(WarehouseDatabaseRepository);
    await repository.delete({
      productId: sku
    });
  }
}

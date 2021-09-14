import { Warehouse } from "../domain/warehouse";

export interface IWarehouseRepository {
  /**
   * Save
   * @param listWarehouse
   */
  save(listWarehouse: Array<Warehouse>): Promise<void>;

  /**
   * Remove SKU
   * @param sku
   */
  removeBySku(sku: number): Promise<void>;
}

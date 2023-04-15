import Warehouse, { WarehouseType } from "src/domain/entities/Warehouse";

export default interface WarehouseRepository {
  create({ locality, quantity, type }: { locality: string, quantity: number, type: WarehouseType }): Promise<Warehouse>;
}

import { EntityRepository, Repository } from "typeorm";
import { WarehouseDatabaseEntity } from "./warehouse-database.entity";

@EntityRepository(WarehouseDatabaseEntity)
export class WarehouseDatabaseRepository extends Repository<WarehouseDatabaseEntity> { }

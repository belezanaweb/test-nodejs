import { EntityRepository, Repository } from "typeorm";
import { ProductDatabaseEntity } from "./product-database.entity";

@EntityRepository(ProductDatabaseEntity)
export class ProductDatabaseRepository extends Repository<ProductDatabaseEntity> { }

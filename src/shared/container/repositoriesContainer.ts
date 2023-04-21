import { container } from "tsyringe"
import { IProductsRepository } from "../../domain/repositories/IProducts.repository"
import { MongoRepository } from "../../domain/repositories/Mongo.repository"

container.registerSingleton<IProductsRepository>("ProductsRepository", MongoRepository)
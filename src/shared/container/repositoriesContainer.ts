import { container } from "tsyringe"
import { IProductsRepository } from "../../repostiories/IProducts.repository"
import { MongoRepository } from "../../repostiories/mongoDB/Mongo.repository"

container.registerSingleton<IProductsRepository>("ProductsRepository", MongoRepository)
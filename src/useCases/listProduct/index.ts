import { ProductsRepository } from "../../repositories/ProductsRepository";
import { ListProductController } from "./ListProductController";
import { ListProductUseCase } from "./ListProductUseCase";


const productsRepository = ProductsRepository.getInstance()
const listProductUseCase = new ListProductUseCase(productsRepository);
const listProductController = new ListProductController(listProductUseCase);


export { listProductController }; 
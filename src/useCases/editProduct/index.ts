import { ProductsRepository } from "../../repositories/ProductsRepository";
import { EditProductController } from "./EditProductController";
import { EditProductUseCase } from "./EditProductUseCase";


const productsRepository = ProductsRepository.getInstance()
const editProductUseCase = new EditProductUseCase(productsRepository);
const editProductController = new EditProductController(editProductUseCase);


export { editProductController }; 
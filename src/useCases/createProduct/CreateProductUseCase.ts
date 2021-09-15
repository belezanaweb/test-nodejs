import { AppError } from "../../errors/AppError";
import { IProductsRepository } from "../../repositories/IProductsRepository";


class CreateProductUseCase {

    constructor(private productsRepository: IProductsRepository){}

    execute(sku: number, name: string, warehouse: []): void{

    
        const productAlreadyExits = this.productsRepository.findByName(sku);

         if(productAlreadyExits) {
             throw new AppError("Product already exists!");
            
        }

        this.productsRepository.create(sku, name, warehouse);

    }

}



export { CreateProductUseCase }
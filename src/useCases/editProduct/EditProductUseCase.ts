import { AppError } from "../../errors/AppError";
import { IProductsRepository } from "../../repositories/IProductsRepository";


class EditProductUseCase {

    constructor(private productsRepository: IProductsRepository){}

    execute(sku: number, name: string, warehouse: []): void{

    
        const productAlreadyExits = this.productsRepository.findByName(sku);

         if(!productAlreadyExits) {
              throw new AppError("Product not already exists!");
            
         }

        this.productsRepository.delete(sku);

        this.productsRepository.edit(sku, name, warehouse);

    }

}



export { EditProductUseCase }
import { AppError } from "../../errors/AppError";
import { IProductsRepository } from "../../repositories/IProductsRepository";


class DeleteProductUseCase {

    constructor(private productsRepository: IProductsRepository){}

    execute(sku: number): void{

        const productAlreadyExits = this.productsRepository.findByName(sku);

        if(!productAlreadyExits) {
              throw new AppError("Product not already exists!");
        };

        this.productsRepository.delete(sku);

    };

};



export { DeleteProductUseCase }
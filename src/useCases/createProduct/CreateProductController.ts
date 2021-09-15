import { Request, Response } from "express";
import { CreateProductUseCase } from "../../useCases/createProduct/CreateProductUseCase";


class CreateProductController {

    constructor(private createProductUseCase: CreateProductUseCase){}

    handle(request: Request, response: Response): Response{

        const product = request.body;

        this.createProductUseCase.execute(product.sku, product.name, product.inventory.warehouses);
        
        return response.json({message: "created"});

    }

};

export { CreateProductController }
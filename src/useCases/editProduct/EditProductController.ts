import { Request, Response } from "express";
import { EditProductUseCase } from "../editProduct/EditProductUseCase";




class EditProductController {

    constructor(private editProductUseCase: EditProductUseCase){}

    handle(request: Request, response: Response): Response{

        const product = request.body;

        this.editProductUseCase.execute(product.sku, product.name, product.inventory.warehouses);
        
        return response.json({message: "edited"});

    }

};

export { EditProductController }
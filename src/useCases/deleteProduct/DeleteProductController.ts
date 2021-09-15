import { Request, Response } from "express";
import { DeleteProductUseCase } from "./DeleteProductUseCase";




class DeleteProductController {

    constructor(private deleteProductUseCase: DeleteProductUseCase){}

    handle(request: Request, response: Response): Response{

        const { sku } = request.query;

        this.deleteProductUseCase.execute(Number(sku));
        
        return response.json({message: "deleted"});

    }

};

export { DeleteProductController }
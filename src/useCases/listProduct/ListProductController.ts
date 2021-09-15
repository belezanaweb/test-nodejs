import { Request, Response } from "express";
import { ListProductUseCase } from "./ListProductUseCase";



class ListProductController {

    constructor(private listProductUseCase: ListProductUseCase){}

    handle(request: Request, response: Response): Response{

        const { sku }   = request.query;

        const product = this.listProductUseCase.execute(Number(sku));
       
        return response.json(product);

    }

};

export { ListProductController }
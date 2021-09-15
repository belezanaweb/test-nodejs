import { Router } from "express";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { createProductController } from "../useCases/createProduct";
import { deleteProductController } from "../useCases/deleteProduct";
import { editProductController } from "../useCases/editProduct";
import { listProductController } from "../useCases/listProduct";


const productsRoutes = Router();
const productsRepository = ProductsRepository.getInstance();

productsRoutes.post("/", (request, response) => {

    return createProductController.handle(request, response);

});

productsRoutes.put("/", (request, response) => {

    return editProductController.handle(request, response);

});

productsRoutes.get("/", (request, response) => {
 
    return listProductController.handle(request, response);
});

productsRoutes.delete("/", (request, response) => {
 
    return deleteProductController.handle(request, response);
});

export { productsRoutes };
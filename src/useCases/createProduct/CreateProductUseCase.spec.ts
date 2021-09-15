import { AppError } from "../../errors/AppError";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/ProductsRepositoryInMemory";
import { CreateProductUseCase } from "./CreateProductUseCase";


let createProductUseCase: CreateProductUseCase;
let productsRepositoryInMemory: ProductsRepositoryInMemory;

describe("Create Product", () => {

    beforeEach(() => {
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory)
    });

    it("should be able to create a new product", async () => {

       expect(async () => {
            const product = {
              sku: 1111,
              name: "Description Test"            
          }

         createProductUseCase.execute(product.sku, product.name, []);

         createProductUseCase.execute(product.sku, product.name, []);

        }).rejects.toBeInstanceOf(AppError);

    
    })
    // Verification Product Exists

    it("should not be able to create new product not name exists", async () => {

        expect(async () => {

            const product = {
                sku: 1111,
                name: "Description Test"
                
            }
    
            createProductUseCase.execute(product.sku, product.name, []);
    
            createProductUseCase.execute( product.sku, product.name, []);
            
        }).rejects.toBeInstanceOf(AppError);

    })
});

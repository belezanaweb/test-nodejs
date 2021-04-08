import { ProductBusiness } from "../src/business/ProductBusiness"
import { ProductInputDTO } from "../src/entities/Product"

describe("Testing Create Product", () =>{
    const productDatabase = { createProduct: jest.fn() } as any

    test("Error when 'name' is empty", async () =>{
        const productBusiness: ProductBusiness = new ProductBusiness(productDatabase)

        const input: ProductInputDTO = {
            sku: 43264,
            name: "",
            inventory: {
                    quantity: 15,
                    warehouses: [
                        {
                            locality: "SP",
                            quantity: 12,
                            type: "ECOMMERCE"
                        },
                        {
                            locality: "MOEMA",
                            quantity: 3,
                            type: "PHYSICAL_STORE"
                        }
                    ]
                }
        }
    
        try {
            await productBusiness.createProduct(input)

        } catch (error) {
            expect(error.message).toBe("Missing properties")  
            expect(error.statusCode).toBe(422)
        }

    })

    test("Error when warehouse type doesn't match", async () =>{
        const productBusiness: ProductBusiness = new ProductBusiness(productDatabase)

        const input: ProductInputDTO = {
            sku: 43264,
            name: "",
            inventory: {
                    quantity: 15,
                    warehouses: [
                        {
                            locality: "SP",
                            quantity: 12,
                            type: "ECOMMERCE"
                        },
                        {
                            locality: "MOEMA",
                            quantity: 3,
                            type: "HOME"
                        }
                    ]
                }
        }
    
        try {
            await productBusiness.createProduct(input)

        } catch (error) {
            expect(error.message).toBe("Invalid warehouse type. Please choose 'PHYSICAL_STORE' or 'ECOMMERCE'")  
            expect(error.statusCode).toBe(422)
        }

    })

    test("Success case", async () =>{
        const productBusiness: ProductBusiness = new ProductBusiness(productDatabase)

        const input: ProductInputDTO = {
            sku: 43264,
            name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
            inventory: {
                    quantity: 15,
                    warehouses: [
                        {
                            locality: "SP",
                            quantity: 12,
                            type: "ECOMMERCE"
                        },
                        {
                            locality: "MOEMA",
                            quantity: 3,
                            type: "PHYSICAL_STORE"
                        }
                    ]
                }
        }
    
        try {
            await productBusiness.createProduct(input)
            expect(productBusiness.createProduct).toHaveBeenCalled()
            expect(productBusiness.createProduct).toHaveBeenCalledWith(input)

        } catch (error) {
            
        }

    })
})
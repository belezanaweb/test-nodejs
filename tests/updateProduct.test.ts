import { ProductBusiness } from "../src/business/ProductBusiness"
import { ProductInputDTO } from "../src/controller/model/Product"

const productsMock = jest.fn((): any =>{
    return [{
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

    ]
})

describe("Testing Create Product", () =>{
    const productDatabase = { updateProduct: jest.fn(), productsMock } as any

    test("Error when product is not found", async () =>{
        const productBusiness: ProductBusiness = new ProductBusiness(productDatabase)

        const product: ProductInputDTO = {
            sku: 12345,
            name: "L'Oréal Professionnel Expert Absolut Repair Cortex",
            inventory: {
                    quantity: 10,
                    warehouses: [
                        {
                            locality: "PR",
                            quantity: 12,
                            type: "ECOMMERCE"
                        },
                    ]
                }
        }
        
        try {
            await productBusiness.updateProduct(product)

        } catch (error) {
            expect(error.message).toBe("Product not found")  
            expect(error.statusCode).toBe(404)
        }

    })


    test("Success case", async () =>{
        const productBusiness: ProductBusiness = new ProductBusiness(productDatabase)

        const product: ProductInputDTO = {
            sku: 43264,
            name: "L'Oréal Professionnel Expert Absolut Repair Cortex",
            inventory: {
                    quantity: 10,
                    warehouses: [
                        {
                            locality: "JUNDIAI",
                            quantity: 3,
                            type: "PHYSICAL_STORE"
                        }
                    ]
                }
        }
    
        try {
            await productBusiness.updateProduct(product)
            expect(productBusiness.updateProduct).toHaveBeenCalled()
            expect(productBusiness.updateProduct).toHaveBeenCalledWith(product)

        } catch (error) {
            
        }

    })
})
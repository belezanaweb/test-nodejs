import { ProductBusiness } from "../src/business/ProductBusiness"

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
    const productDatabase = { deleteProduct: jest.fn(), productsMock } as any

    test("Error when product is not found", async () =>{
        const productBusiness: ProductBusiness = new ProductBusiness(productDatabase)

        try {
            await productBusiness.deleteProduct(12345)

        } catch (error) {
            expect(error.message).toBe("Product not found")  
            expect(error.statusCode).toBe(404)
        }

    })


    test("Success case", async () =>{
        const productBusiness: ProductBusiness = new ProductBusiness(productDatabase)

        
    
        try {
            await productBusiness.deleteProduct(43264)
            expect(productBusiness.deleteProduct).toHaveBeenCalled()
            expect(productBusiness.deleteProduct).toHaveBeenCalledWith(43264)

        } catch (error) {
            
        }

    })
})
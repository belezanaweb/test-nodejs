import { ProductBusiness } from '../src/business/ProductBusiness'

describe("Testing getProduct ", () => {
    const productDatabase = {}

    test("Should return 'Product Not Found'", () => {

        try {
            const findBySku = jest.fn((sku: number) => null)

            const productDatabase = { findBySku }
    
            const productBusiness = new ProductBusiness(
                productDatabase as any
            )
    
            const sku = 43268
    
            productBusiness.getProduct(sku)
    
            expect(findBySku).toHaveBeenCalledWith(sku)
        } catch (err) {
            expect(err.errorCode).toBe(404)
            expect(err.message).toBe("Product not found")
        }
    })

    test("Should getProduct", () => {

        try {
            const findBySku = jest.fn((sku: number) => sku)

            const productDatabase = { findBySku }
    
            const productBusiness = new ProductBusiness(
                productDatabase as any
            )
    
            const sku = 43265
    
            productBusiness.getProduct(sku)
    
            expect(findBySku).toBe(43265)
            expect(sku).toBe(43265)
        } catch (err) {
            expect(err.errorCode).toBeUndefined()
        }
    })
})
import { ProductBusiness } from '../src/business/ProductBusiness'

describe("Testing ProductBusiness.deleteProduct", () => {
    const productDatabase = {};

    test("Should return 'Product Not Found'", () => {

        try {
            const findBySku = jest.fn((sku: number) => null)

            const productDatabase = { findBySku }
    
            const productBusiness = new ProductBusiness(
                productDatabase as any
            );
    
            const sku = 43268
    
            productBusiness.getProduct(sku)
    
            expect(findBySku).toHaveBeenCalledWith(sku);
            expect(findBySku).toThrow(Error)
        } catch (err) {
            expect(err.errorCode).toBe(404)
            expect(err.message).toBe("Product not found")
        }
    })

    test("Should deleteProduct", () => {

        try {
            const findBySku = jest.fn((sku: number) => null)

            const productDatabase = { findBySku }
    
            const productBusiness = new ProductBusiness(
                productDatabase as any
            );
    
            const sku = 43268
    
            productBusiness.getProduct(sku)
    
            expect(findBySku).toBe(43268)
            expect(sku).toBe(43268)
        } catch (err) {
            expect(err.errorCode).toBe(404)
            expect(err.message).toBe("Product not found")
        }
    })
})
import { ProductBusiness } from '../src/business/ProductBusiness';
import { NotFoundError } from '../src/errors';

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
    
            productBusiness.recuperationProduct(sku)
    
            expect(findBySku).toHaveBeenCalledWith(sku);
            expect(findBySku).toThrow(Error)
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundError);
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
    
            productBusiness.recuperationProduct(sku)
    
            expect(findBySku).toBe(43268)
            expect(sku).toBe(43268)
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundError);
        }
    })
})


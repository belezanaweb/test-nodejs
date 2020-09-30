import { ProductBusiness } from '../src/business/ProductBusiness';
import { InvetoryInterface } from '../src/interfaces/InvetoryInterface'
import { WarehouseInterface } from '../src/interfaces/WarehouseInterface'
import { TypeWarehouse } from '../src/enums/TypeWarehouse';
import { Product } from '../src/model/Product';
import { NotFoundError } from '../src/errors';

describe("Testing ProductBusiness.recuperationProduct", () => {
    const productDatabase = {};

    test("Should return 'Product Not Found'", () => {

        try {
            const findBySku = jest.fn((sku: number) => {})

            const productDatabase = { findBySku }
    
            const productBusiness = new ProductBusiness(
                productDatabase as any
            );
    
            const sku = 43268
    
            const result = productBusiness.recuperationProduct(sku)
    
            expect(findBySku).toHaveBeenCalledWith(sku);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundError);
        }
    })

    test("Should recuperationProduct", () => {

        try {
            const findBySku = jest.fn((sku: number) => {})

            const productDatabase = { findBySku }
    
            const productBusiness = new ProductBusiness(
                productDatabase as any
            );
    
            const sku = 43265
    
            const result = productBusiness.recuperationProduct(sku)
    
            expect(findBySku).toBe(43265)
            expect(sku).toBe(43265)
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundError);
        }
    })
})


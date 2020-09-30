import { ProductBusiness } from '../src/business/ProductBusiness';
import { InvetoryInterface } from '../src/interfaces/InvetoryInterface'
import { WarehouseInterface } from '../src/interfaces/WarehouseInterface'
import { TypeWarehouse } from '../src/enums/TypeWarehouse';

describe("Testing ProductBusiness.createProduct", () => {
    const productDatabase = {};

    test("Should return 'Missing Input' for empty sku", () => {
        expect.assertions(2);

        try {
            const productBusiness = new ProductBusiness(
                productDatabase as any
            );
            
            const warehouses: WarehouseInterface[] = [
                {
                    locality: 'SP',
                    quantity: 12,
                    type: TypeWarehouse.ECOMMERCE
                }
            ]

            const inventory: InvetoryInterface = {
                warehouses
            }

            productBusiness.createProduct(
                0,
                "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
                inventory
            )

            expect(productBusiness.createProduct).toThrow(Error)
            expect(productBusiness.createProduct).toThrow('Missing Input')
        } catch (err) {
            expect(err.errorCode).toBe(422);
            expect(err.message).toBe("Missing Input");
        }
    })

    test("Should return 'Missing Input' for empty name", () => {
        expect.assertions(2);

        try {
            const productBusiness = new ProductBusiness(
                productDatabase as any
            );
            
            const warehouses: WarehouseInterface[] = [
                {
                    locality: 'SP',
                    quantity: 12,
                    type: TypeWarehouse.ECOMMERCE
                }
            ]

            const inventory: InvetoryInterface = {
                warehouses
            }

            productBusiness.createProduct(
                0,
                "",
                inventory
            )

            expect(productBusiness.createProduct).toThrow(Error)
            expect(productBusiness.createProduct).toThrow('Missing Input')
        } catch (err) {
            expect(err.errorCode).toBe(422);
            expect(err.message).toBe("Missing Input");
        }
    })

    test("Should return 'Missing Input' for empty inventory", () => {
        expect.assertions(2);

        try {
            const productBusiness = new ProductBusiness(
                productDatabase as any
            );

            const inventory: InvetoryInterface = null as any;

            productBusiness.createProduct(
                0,
                "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
                inventory
            )

            expect(productBusiness.createProduct).toThrow(Error)
            expect(productBusiness.createProduct).toThrow('Missing Input')
        } catch (err) {
            expect(err.errorCode).toBe(422);
            expect(err.message).toBe("Missing Input");
        }
    })

    test("Should createProduct", () => {

        try {
            const productBusiness = new ProductBusiness(
                productDatabase as any
            );
            
            const warehouses: WarehouseInterface[] = [
                {
                    locality: 'SP',
                    quantity: 12,
                    type: TypeWarehouse.ECOMMERCE
                }
            ]

            const inventory: InvetoryInterface = {
                warehouses
            }

            productBusiness.createProduct(
                43265,
                "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
                inventory
            )

            expect(productBusiness.createProduct).toThrow(Error);
            expect(productBusiness.createProduct).toThrow('Missing Input');
            expect(productBusiness.createProduct).toHaveBeenCalledWith(43265);
            expect(productBusiness.createProduct).toHaveBeenCalledWith("L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g");
        } catch (err) {
            expect(err.errorCode).toBeUndefined();
        }
    })
})
import { ProductBusiness } from '../src/business/ProductBusiness';
import { Inventory } from '../src/model/Invetory';
import { Warehouse } from '../src/model/Warehouse'
import { TypeWarehouse } from '../src/enums/TypeWarehouse';

describe("Testing ProductBusiness.editProduct", () => {
    const productDatabase = {}

    test("Should return 'Missing Input' for empty inventory", () => {

        try {
            const productBusiness = new ProductBusiness(
                productDatabase as any
            );

            const modelInventory: Inventory = null as any;

            productBusiness.editProduct(
                43268,
                "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
                modelInventory
            )

        } catch (err) {
            expect(err.errorCode).toBe(422);
            expect(err.message).toBe("Missing Input");
        }
    })

    test("Should return 'Missing Input' for empty sku", () => {

        try {
            const productBusiness = new ProductBusiness(
                productDatabase as any
            );

            const modelInventory: Inventory = new Inventory([ new Warehouse('SP', 10, TypeWarehouse.ECOMMERCE) ]);

            productBusiness.editProduct(
                0,
                "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
                modelInventory
            )

        } catch (err) {
            expect(err.errorCode).toBe(422);
            expect(err.message).toBe("Missing Input");
        }
    })
})
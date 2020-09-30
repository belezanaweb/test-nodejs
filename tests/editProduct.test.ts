import { ProductBusiness } from '../src/business/ProductBusiness';
import { TypeWarehouse } from '../src/enums/TypeWarehouse';
import { InvetoryInterface } from '../src/interfaces/InvetoryInterface';
import { WarehouseInterface } from '../src/interfaces/WarehouseInterface';

describe("Testing ProductBusiness.editProduct", () => {
    const productDatabase = {}

    test("Should return 'Missing Input' for empty inventory", () => {

        try {
            const productBusiness = new ProductBusiness(
                productDatabase as any
            );

            const modelInventory: InvetoryInterface = null as any;

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

            const warehouses: WarehouseInterface[] = [
                {
                    locality: 'SP',
                    quantity: 12,
                    type: TypeWarehouse.ECOMMERCE
                }
            ]

            const modelInventory: InvetoryInterface = {
                warehouses
            }

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
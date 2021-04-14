import { ProductBusiness } from '../src/business/ProductBusiness';
import { WarehouseType } from '../src/enum/WarehouseType';
import { InventoryInterface } from '../src/interface/Inventory';
import { WarehouseInterface } from '../src/interface/Warehouse';

describe("Testing ProductBusiness.editProduct", () => {
    const productDatabase = {}

    test("Should return 'Missing Input' for empty inventory", () => {

        try {
            const productBusiness = new ProductBusiness(
                productDatabase as any
            );

            const modelInventory: InventoryInterface = null as any;

            productBusiness.editProduct(
                43268,
                43268,
                "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
                modelInventory
            )

        } catch (err) {
            expect(err.errorCode).toBe(400);
            expect(err.message).toBe("Invalid input");
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
                    type: WarehouseType.ECOMMERCE
                }
            ]

            const modelInventory: InventoryInterface = {
                warehouses
            }

            productBusiness.editProduct(
                0,
                0,
                "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
                modelInventory
            )

        } catch (err) {
            expect(err.errorCode).toBe(400);
            expect(err.message).toBe("Invalid input");
        }
    })
})
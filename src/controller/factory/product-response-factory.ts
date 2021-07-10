import { ProductModel } from "../../repository/models";
import { ProductResponse } from "../dtos";

export class ProductResponseFactory {

    public static create(model: ProductModel): ProductResponse {
        let inventoryQuantity = 0;
        model.inventory.warehouses.forEach(w => {
            inventoryQuantity += w.quantity
        });

        let response: ProductResponse = {
            sku: model.sku,
            name: model.name,
            inventory: {
                quantity: inventoryQuantity,
                warehouses: model.inventory.warehouses
            },
            isMarketable: inventoryQuantity > 0
        }

        return response;
    }
}
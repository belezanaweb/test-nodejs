"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResponseFactory = void 0;
class ProductResponseFactory {
    static create(model) {
        let inventoryQuantity = 0;
        model.inventory.warehouses.forEach(w => {
            inventoryQuantity += w.quantity;
        });
        let response = {
            sku: model.sku,
            name: model.name,
            inventory: {
                quantity: inventoryQuantity,
                warehouses: model.inventory.warehouses
            },
            isMarketable: inventoryQuantity > 0
        };
        return response;
    }
}
exports.ProductResponseFactory = ProductResponseFactory;
//# sourceMappingURL=product-response-factory.js.map
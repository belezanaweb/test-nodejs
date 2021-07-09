"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductLogic = void 0;
const typedi_1 = __importDefault(require("typedi"));
const product_repository_1 = require("../repository/product-repository");
class ProductLogic {
    constructor() {
        this.repository = typedi_1.default.get(product_repository_1.ProductRepository);
    }
    createProduct(body) {
        this.repository.save(body);
    }
    updateProduct(body) {
        this.repository.update(body);
    }
    findProduct(sku) {
        const model = this.repository.findBySku(sku);
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
            isMarketable: inventoryQuantity
        };
        return response;
    }
    deleteProduct(sku) {
        this.repository.delete(sku);
    }
}
exports.ProductLogic = ProductLogic;
//# sourceMappingURL=product-logic.js.map
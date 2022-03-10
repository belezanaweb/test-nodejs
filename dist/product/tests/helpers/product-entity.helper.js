"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntityHelper = void 0;
const class_transformer_1 = require("class-transformer");
const product_entity_1 = require("../../entities/product.entity");
class ProductEntityHelper {
    static getInstance() {
        const plain = {
            sku: 1234,
            name: 'Shampoo',
            isMarketable: false,
            inventory: {
                warehouses: new Array(0),
                quantity: 0,
            },
        };
        return (0, class_transformer_1.plainToClass)(product_entity_1.ProductEntity, plain);
    }
}
exports.ProductEntityHelper = ProductEntityHelper;
//# sourceMappingURL=product-entity.helper.js.map
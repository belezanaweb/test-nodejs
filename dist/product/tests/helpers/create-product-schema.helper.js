"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductSchemaHelper = void 0;
const class_transformer_1 = require("class-transformer");
const schemas_1 = require("../../schemas");
class CreateProductSchemaHelper {
    static getInstance() {
        const plain = {
            sku: 1234,
            name: 'Shampoo',
            inventory: {
                warehouses: new Array(0),
            },
        };
        return (0, class_transformer_1.plainToClass)(schemas_1.CreateProductSchema, plain);
    }
}
exports.CreateProductSchemaHelper = CreateProductSchemaHelper;
//# sourceMappingURL=create-product-schema.helper.js.map
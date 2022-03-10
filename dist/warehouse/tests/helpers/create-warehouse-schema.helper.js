"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWarehouseSchemaHelper = void 0;
const class_transformer_1 = require("class-transformer");
const create_warehouse_schema_1 = require("../../schemas/create-warehouse.schema");
class CreateWarehouseSchemaHelper {
    static getInstance() {
        const plain = {
            locality: 'ALI',
            quantity: 10,
            type: 'AQUELE',
        };
        return (0, class_transformer_1.plainToClass)(create_warehouse_schema_1.CreateWarehouseSchema, plain);
    }
}
exports.CreateWarehouseSchemaHelper = CreateWarehouseSchemaHelper;
//# sourceMappingURL=create-warehouse-schema.helper.js.map
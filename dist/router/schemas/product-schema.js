"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const express_validator_1 = require("express-validator");
const enum_1 = require("../../enum");
exports.ProductSchema = {
    POST_PRODUCT: [
        express_validator_1.body('sku').exists().withMessage('Field sku is required.')
            .isNumeric().withMessage('Field sku must be numeric.'),
        express_validator_1.body('name').exists().withMessage('Field name is required.'),
        express_validator_1.body('inventory').exists().withMessage('Field inventory is required.'),
        express_validator_1.body('inventory.warehouses').exists().withMessage('Field inventory.warehouses is required.'),
        express_validator_1.body('inventory.warehouses.*.locality').exists().withMessage('Field inventory.warehouses.locality is required.'),
        express_validator_1.body('inventory.warehouses.*.quantity').exists().withMessage('Field inventory.warehouses.quantity is required.')
            .isNumeric().withMessage('Field inventory.warehouses.quantity must be numeric.'),
        express_validator_1.body('inventory.warehouses.*.type').exists().withMessage('Field inventory.warehouses.type is required.')
            .isIn([enum_1.WarehouseType.ECOMMERCE, enum_1.WarehouseType.PHYSICAL_STORE]),
    ],
    PUT_PRODUCT: [
        express_validator_1.param('sku').exists().withMessage('Parameter sku is required.')
            .isNumeric().withMessage('Parameter sku must be numeric.'),
        express_validator_1.body('sku').exists().withMessage('Field sku is required.')
            .isNumeric().withMessage('Field sku must be numeric.'),
        express_validator_1.body('name').exists().withMessage('Field name is required.'),
        express_validator_1.body('inventory').exists().withMessage('Field inventory is required.'),
        express_validator_1.body('inventory.warehouses').exists().withMessage('Field inventory.warehouses is required.'),
        express_validator_1.body('inventory.warehouses.*.locality').exists().withMessage('Field inventory.warehouses.locality is required.'),
        express_validator_1.body('inventory.warehouses.*.quantity').exists().withMessage('Field inventory.warehouses.quantity is required.')
            .isNumeric().withMessage('Field inventory.warehouses.quantity must be numeric.'),
        express_validator_1.body('inventory.warehouses.*.type').exists().withMessage('Field inventory.warehouses.type is required.')
            .isIn([enum_1.WarehouseType.ECOMMERCE, enum_1.WarehouseType.PHYSICAL_STORE]),
    ],
    GET_PRODUCT: [
        express_validator_1.param('sku').exists().withMessage('Parameter sku is required.')
            .isNumeric().withMessage('Parameter sku must be numeric.'),
    ],
    DELETE_PRODUCT: [
        express_validator_1.param('sku').exists().withMessage('Parameter sku is required.')
            .isNumeric().withMessage('Parameter sku must be numeric.'),
    ],
};
//# sourceMappingURL=product-schema.js.map
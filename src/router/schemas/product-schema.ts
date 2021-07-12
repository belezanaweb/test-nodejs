import { body, param } from "express-validator";
import { WarehouseType } from "../../enum";

export const ProductSchema = {
    POST_PRODUCT: [
        body('sku').exists().withMessage('Field sku is required.')
            .isNumeric().withMessage('Field sku must be numeric.'),
        body('name').exists().withMessage('Field name is required.'),
        body('inventory').exists().withMessage('Field inventory is required.'),
        body('inventory.warehouses').exists().withMessage('Field inventory.warehouses is required.'),
        body('inventory.warehouses.*.locality').exists().withMessage('Field inventory.warehouses.locality is required.'),
        body('inventory.warehouses.*.quantity').exists().withMessage('Field inventory.warehouses.quantity is required.')
            .isNumeric().withMessage('Field inventory.warehouses.quantity must be numeric.'),
        body('inventory.warehouses.*.type').exists().withMessage('Field inventory.warehouses.type is required.')
            .isIn([WarehouseType.ECOMMERCE, WarehouseType.PHYSICAL_STORE]),
    ],
    PUT_PRODUCT: [
        param('sku').exists().withMessage('Parameter sku is required.')
            .isNumeric().withMessage('Parameter sku must be numeric.'),
        body('sku').exists().withMessage('Field sku is required.')
            .isNumeric().withMessage('Field sku must be numeric.'),
        body('name').exists().withMessage('Field name is required.'),
        body('inventory').exists().withMessage('Field inventory is required.'),
        body('inventory.warehouses').exists().withMessage('Field inventory.warehouses is required.'),
        body('inventory.warehouses.*.locality').exists().withMessage('Field inventory.warehouses.locality is required.'),
        body('inventory.warehouses.*.quantity').exists().withMessage('Field inventory.warehouses.quantity is required.')
            .isNumeric().withMessage('Field inventory.warehouses.quantity must be numeric.'),
        body('inventory.warehouses.*.type').exists().withMessage('Field inventory.warehouses.type is required.')
            .isIn([WarehouseType.ECOMMERCE, WarehouseType.PHYSICAL_STORE]),
    ],
    GET_PRODUCT: [
        param('sku').exists().withMessage('Parameter sku is required.')
            .isNumeric().withMessage('Parameter sku must be numeric.'),
    ],
    DELETE_PRODUCT: [
        param('sku').exists().withMessage('Parameter sku is required.')
            .isNumeric().withMessage('Parameter sku must be numeric.'),
    ],
}
const { check } = require('express-validator/check');
const _ = require('lodash');
const {
	getProductBySku
} = absoluteRequire('repositories/product');
const constants = absoluteRequire('modules/constants');

module.exports.contactValidator = ({ uniqueSku }) => [
	check('sku')
		.exists()
		.withMessage(constants.EXPRESS_VALIDATOR_MESSAGES.PRODUCT.SKU_IS_REQUIRED)
		.custom(async (sku) => {
			if (uniqueSku) {
				const product = await getProductBySku(sku);

				if (product) {
					return false;
				}
			}

			return true;
		})
		.withMessage(constants.EXPRESS_VALIDATOR_MESSAGES.PRODUCT.PRODUCT_SKU_ALREADY_ADDED),
	check('name')
		.exists()
		.withMessage(constants.EXPRESS_VALIDATOR_MESSAGES.PRODUCT.NAME_IS_REQUIRED),
	check('inventory')
		.custom(async (iventory) => {
			if (_.isPlainObject(iventory)) {
				if (_.isArray(iventory.warehouses)) {
					return true;
				}
			}
			return false;
		})
		.withMessage(constants.EXPRESS_VALIDATOR_MESSAGES.PRODUCT.INVENTORY_WAREHOUSES_IS_REQUIRED)
];

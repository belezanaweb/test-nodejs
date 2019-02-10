const { check } = require('express-validator/check');

const {
	getProductBySku
} = absoluteRequire('repositories/product');
const constants = absoluteRequire('modules/constants');

module.exports.postContactValidator = () => [
	check('sku')
		.exists()
		.withMessage(constants.EXPRESS_VALIDATOR_MESSAGES.PRODUCT.SKU_IS_REQUIRED)
		.custom(async (sku) => {
			const product = await getProductBySku(sku);

			if (product) {
				return false;
			}

			return true;
		})
		.withMessage(constants.EXPRESS_VALIDATOR_MESSAGES.PRODUCT.PRODUCT_SKU_ALREADY_ADDED),
	check('name')
		.exists()
		.withMessage(constants.EXPRESS_VALIDATOR_MESSAGES.PRODUCT.NAME_IS_REQUIRED)
];

module.exports.putContactValidator = () => [
	check('sku')
		.exists(),
	check('name')
		.exists()
		.withMessage(constants.EXPRESS_VALIDATOR_MESSAGES.PRODUCT.NAME_IS_REQUIRED)
];

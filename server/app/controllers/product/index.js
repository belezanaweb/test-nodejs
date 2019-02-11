const { validationResult } = require('express-validator/check');
const logger = absoluteRequire('modules/winston');
const {
	addProduct,
	findProducts,
	getProductBySku,
	setProductFlags,
	deleteProductBySku,
	editProduct
} = absoluteRequire('repositories/product');

module.exports.getProducts = async (req, res) => {
	try {
		const result = await findProducts();

		res.status(200)
			.json({
				success: true,
				result: setProductFlags(result)
			});
	} catch (error) {
		logger.error('Requesting API: Error trying to find products', {
			error
		});

		res.status(500)
			.json({
				success: false,
				result: []
			});
	}
};

module.exports.postProduct = async (req, res) => {
	const errors = validationResult(req).array();
	const model = req.body;

	if (errors.length > 0) {
		res.status(400)
			.json({
				success: false,
				result: [],
				errors
			});
	} else {
		try {
			await addProduct(model);
			res.status(200)
				.json({
					success: true
				});
		} catch (error) {
			logger.error('Requesting API: Error trying to add a product', {
				error
			});

			res.status(500)
				.json({
					success: false,
					result: []
				});
		}
	}
};

module.exports.putProduct = async (req, res) => {
	const errors = validationResult(req).array();
	const model = req.body;

	if (errors.length > 0) {
		res.status(400)
			.json({
				success: false,
				result: [],
				errors
			});
	} else {
		try {
			await editProduct(model);
			res.status(200)
				.json({
					success: true
				});
		} catch (error) {
			logger.error('Requesting API: Error trying to edit a product', {
				error
			});

			res.status(500)
				.json({
					success: false,
					result: []
				});
		}
	}
};

module.exports.getProductBySku = async (req, res) => {
	const {
		sku
	} = req.params;

	try {
		const result = await getProductBySku(sku);

		res.status(200)
			.json({
				success: true,
				result: result ? setProductFlags([result])[0] : {}
			});
	} catch (error) {
		logger.error('Requesting API: Error trying to get product by sku', {
			error
		});

		res.status(500)
			.json({
				success: false,
				result: []
			});
	}
};

module.exports.deleteProductBySku = async (req, res) => {
	const {
		sku
	} = req.params;

	try {
		await deleteProductBySku(sku);

		res.status(200)
			.json({
				success: true
			});
	} catch (error) {
		logger.error('Requesting API: Error trying to delete product by sku', {
			error
		});

		res.status(500)
			.json({
				success: false,
				result: []
			});
	}
};

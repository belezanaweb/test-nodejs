const { validationResult } = require('express-validator/check');

const logger = absoluteRequire('modules/winston');

const {
	addProduct,
	findProducts
} = absoluteRequire('repositories/product');

module.exports.getProducts = async (req, res) => {
	try {
		const result = await findProducts();

		res.status(200)
			.json({
				success: true,
				result
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
		res.status(500)
			.json({
				success: false,
				result: [],
				errors
			});
	} else {
		try {
			const result = await addProduct(model);
			res.status(200)
				.json({
					success: true,
					result
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

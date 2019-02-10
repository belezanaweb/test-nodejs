let products = [];
const _ = require('lodash');

module.exports.getProducts = () => new Promise(resolve => resolve(products));

module.exports.deleteProductBySku = sku => new Promise((resolve) => {
	products = _.filter(products, product => String(product.sku) !== String(sku));
	resolve();
});

module.exports.addProduct = model => new Promise((resolve) => {
	products.push(model);
	resolve();
});

module.exports.editProduct = model => new Promise((resolve) => {
	products = products.map((product) => {
		if (String(product.sku) === String(model.sku)) {
			return model;
		}

		return product;
	});

	resolve();
});

module.exports.getProductBySku = sku => new Promise(resolve => resolve(
	_.find(products, item => String(item.sku) === String(sku))
));

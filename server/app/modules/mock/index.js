let products = [];

module.exports.getProducts = () => new Promise(resolve => resolve(products));

module.exports.deleteProductBySku = sku => new Promise((resolve) => {
	products = products.filter(product => String(product.sku) !== String(sku));
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
	products.find(item => String(item.sku) === String(sku))
));

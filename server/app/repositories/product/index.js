const {
	getProducts,
	addProduct,
	getProductBySku
} = absoluteRequire('modules/mock');

module.exports.findProducts = () => getProducts();
module.exports.addProduct = model => addProduct(model);
module.exports.getProductBySku = model => getProductBySku(model);

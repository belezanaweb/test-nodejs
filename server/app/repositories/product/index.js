const {
	getProducts,
	addProduct,
	getProductBySku,
	deleteProductBySku,
	editProduct
} = absoluteRequire('modules/mock');

module.exports.deleteProductBySku = sku => deleteProductBySku(sku);
module.exports.findProducts = () => getProducts();
module.exports.addProduct = model => addProduct(model);
module.exports.editProduct = model => editProduct(model);
module.exports.getProductBySku = sku => getProductBySku(sku);
module.exports.setProductFlags = products => products.map((item) => {
	const product = item;

	product.inventory.quantity = item.inventory.warehouses.reduce(
		(accumulator, current) => accumulator + current.quantity, 0
	);
	product.marketable = item.inventory.quantity > 0;

	return item;
});

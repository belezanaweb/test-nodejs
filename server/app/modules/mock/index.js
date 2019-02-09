const products = [];
const _ = require('lodash');

module.exports.getProducts = () => new Promise((resolve) => {
	resolve(products);
});

module.exports.removeProduct = () => {

};
module.exports.addProduct = model => new Promise((resolve) => {
	products.push(model);
	resolve();
});


module.exports.getProductBySku = sku => new Promise((resolve) => {
	const product = _.find(products, item => item.sku === sku);
	resolve(product);
});

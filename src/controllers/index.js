const service = require('../services/index.js')
const schemaCreateProduct = require('./validator/validator.js');

const STATUS_NOT_FOUND = 404;
const STATUS_CREATED = 201;
const STATUS_NO_CONTENT = 204;
const STATUS_BAD_REQUEST = 400;
const STATUS_CONFLICT = 409;

getProductBySku = (req, res) => {
  const product = service.getProductBySku(req.params.sku);
  if (product) {
    console.log(`product sku ${product.sku} recovery with successful`)
    return res.send(product);
  }

  res.status(STATUS_NOT_FOUND).send({ message: `Product with sku ${req.params.sku} not found.` })
};

createProduct = (req, res) => {
  const { error, value } = schemaCreateProduct.validate(req.body)

  if (error) {
    console.log(error.details)
    return res.status(STATUS_BAD_REQUEST).send(error.details)
  }

  const product = service.createProduct(req.body)

  if (product) {
    console.log(`product sku ${req.body.sku} add in memory`)
    return res.status(STATUS_CREATED).send()
  }

  res.status(STATUS_CONFLICT).send({ message: `product sku ${req.body.sku} exist in memory` })
  console.log(`product sku ${req.body.sku} exist in memory`)
};

updateProductBySku = (req, res) => {
  var update = service.updateProductBySku(req.body)

  if (update) {
    console.log(`product sku ${req.body.sku} update with successful`)
    res.status(STATUS_NO_CONTENT).send();
  }
};

deleteProductBySku = (req, res) => {
  var deleted = service.deleteProductBySku(req.params.sku)

  if (deleted) {
    console.log(`product sku ${req.params.sku} deleted with successful`)
    res.status(STATUS_NO_CONTENT).send();
  }
};

module.exports = {
  getProductBySku,
  createProduct,
  updateProductBySku,
  deleteProductBySku
};

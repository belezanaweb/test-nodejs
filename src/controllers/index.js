const service = require('../services/index.js')

const STATUS_NOT_FOUND = 404;
const STATUS_CREATED = 201;
const STATUS_NO_CONTENT = 204;
const OK = 200

const controller = {
  GetProductBySku(req, res) {

    const product = service.getProductBySku(req.params.sku);
    if (!product) {
      res.status(STATUS_NOT_FOUND).send(`Product with sku ${req.params.sku} dont found. Error 404`)
    }
    res.send(product);
    console.log(`product sku ${product.sku} recovery with successful`)
  },

  CreateProduct(req, res) {
    const product = service.createProduct(req.body)

    if (product) {
      console.log(`product sku ${req.body.sku} add in memory`)
      res.status(STATUS_CREATED).send()
    }

    console.log(`product sku ${req.body.sku} exist in memory`)
  },

  UpdateProductBySku(req, res) {
    var update = service.updateProductBySku(req.body)

    if(update) {
      console.log(`product sku ${req.body.sku} update with successful`)
      res.status(STATUS_NO_CONTENT).send();
    }
  },

  DeleteProductBySku(req, res) {
    var deleted = service.deleteProductBySku(req.params.sku)

    if(deleted) {
      console.log(`product sku ${req.params.sku} deleted with successful`)
      res.status(OK).send();
    }
  }
}

module.exports = controller;

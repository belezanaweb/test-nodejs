module.exports = app => {
  const controller = app.controllers.products;

  const { productValidator, validate } = require('../controllers/validator.js')

  app.route('/api/v1/products')
    .get(controller.listAllProducts)
    .post(productValidator(), validate, controller.saveProduct)
    .put(productValidator(), validate, controller.alterProduct);

  app.route('/api/v1/products/:sku')
    .get(controller.listProduct)
    .delete(controller.excludeProduct);
}
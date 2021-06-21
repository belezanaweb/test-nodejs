module.exports = (app) => {
  const productController = require('../controllers/productController');

  app.post('/products', productController.post);
  app.get('/products', productController.findAll);
  app.get('/products/:sku', productController.findOne);
  app.put('/products/:sku', productController.put);
  app.delete('/products/:sku', productController.delete);
}

import ProductsController from '../controllers/ProductsController';
import * as express from 'express';
const router = express.Router();

router.route('/products')
  .post(function(req, res) {
    ProductsController.create(req, res);
  });

router.route('/products/:id')
  .get(function(req, res, next) {
    ProductsController.getBySku(req.params.id, res);
  })
  .put(function(req, res, next) {
    ProductsController.update(req.params.id, req, res);
  })
  .delete(function(req, res, next) {
    ProductsController.delete(req.params.id, req, res);
  });

export default router;
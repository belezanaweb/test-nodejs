const ProductService = require("../services/ProductService");

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  get(request, response, next) {
    try {
      const products = this.productService.get();

      return response.json(products);
    } catch (error) {
      next(error);
    }
  }

  getBySku(request, response, next) {
    try {
      const { sku } = request.params;

      const products = this.productService.getBySku(sku);

      return response.json(products);
    } catch (error) {
      next(error);
    }
  }

  create(request, response, next) {
    try {
      const payload = request.body;

      const product = this.productService.create(payload);

      return response.status(201).json(product);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  update(request, response, next) {
    try {
      const payload = request.body;

      const product = this.productService.update(payload);

      return response.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  delete(request, response, next) {
    try {
      const { sku } = request.params;

      this.productService.delete(sku);

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;

const productRepository = require('../repository/product');
const productService = require('../service/product');

const productController = {
  get(req, res) {
    const response = productRepository.get();
    return res.json(response);
  },

  getBySku(req, res) {
    const { sku } = req.params;
    const product = productRepository.getBySku(sku);
    if (!product)
      return res.status(404).json({ error: 'product doesn`t exists' });
    const response = productService.isMarketable(
      productService.getInventoryQuantity(product)
    );
    return res.json(response);
  },

  post(req, res) {
    const { sku } = req.body;
    const productExists = productRepository.getBySku(sku);
    if (productExists) {
      return res.status(400).json({ error: 'product already exists' });
    }
    productRepository.post(req.body);
    return res.json({ message: 'product created' });
  },

  put(req, res) {
    const { sku } = req.params;
    if (req.body.sku !== Number(sku)) {
      return res
        .status(400)
        .json({ error: 'product sku doesn`t match with request body' });
    }
    const productExists = productRepository.getBySku(sku);
    if (!productExists) {
      return res.status(404).json({ error: 'product doesn`t exists' });
    }
    productRepository.put(sku, req.body);
    return res.json({ message: 'product updated' });
  },

  delete(req, res) {
    const { sku } = req.params;
    const productExists = productRepository.getBySku(sku);
    if (!productExists) {
      return res.status(404).json({ error: 'product doesn`t exists' });
    }
    productRepository.delete(sku);
    return res.json({ message: 'product deleted' });
  },
};

module.exports = productController;

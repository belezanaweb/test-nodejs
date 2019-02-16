const express = require('express');

const router = express.Router();

let products = require('../data/products.json');

// Get all Products
router.get('/', (req, res) => {
  products.forEach((element) => {
    if (element) {
      element.inventory.quantity = element.inventory.warehouses.reduce((acc, elem) => acc + elem.quantity,
        0);

      if (element.inventory.quantity > 0) {
        element.isMarketable = true;
      } else {
        element.isMarketable = false;
      }
    }
  });
  res.json(products);
});

// Get specific Product based on SKU
router.get('/:sku', (req, res) => {
  try {
    const sku = parseInt(req.params.sku);
    const currentProduct = products.filter(p => p.sku === sku)[0];
    if (currentProduct) {
      currentProduct.inventory.quantity = currentProduct.inventory.warehouses.reduce((acc, elem) => acc + elem.quantity,
        0);

      if (currentProduct.inventory.quantity > 0) {
        currentProduct.isMarketable = true;
      } else {
        currentProduct.isMarketable = false;
      }
      res.json(currentProduct);
    } else {
      res.sendStatus(404).json({ message: 'Product not found.' });
    }
  } catch (err) {
    res.sendStatus(404).json({ message: 'Product not found.' });
  }
});

// Add Product
router.post('/', (req, res) => {
  try {
    const product = req.body;
    const isValid = isUnique(product);

    if (isValid) {
      product.inventory.quantity = product.inventory.warehouses.reduce((acc, elem) => acc + elem.quantity,
        0);

      if (product.inventory.quantity > 0) {
        product.isMarketable = true;
      } else {
        product.isMarketable = false;
      }
      products.push(product);
      res.send(product);
    } else {
      res.sendStatus(500).json({ message: 'Specified SKU already exists.' });
    }
  } catch (err) {
    res.sendStatus(500).json({ message: 'Specified SKU already exists.' });
  }
});

// Update Product
router.put('/:sku', (req, res) => {
  try {
    const sku = parseInt(req.params.sku);
    const currentProduct = products.filter(p => p.sku === sku)[0];

    if (currentProduct) {
      const product = req.body;
      if (product) {
        currentProduct.sku = currentProduct.sku;
        currentProduct.name = product.name;
        currentProduct.inventory = product.inventory;
        res.sendStatus(204);
      } else {
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(404).json({ message: 'Product not found.' });
  }
});

// delete Product
router.delete('/:sku', (req, res) => {
  const sku = parseInt(req.params.sku);
  const currentProduct = products.filter(p => p.sku === sku)[0];
  if (currentProduct) {
    products = products.filter(p => p.sku !== sku);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

// validation for add a Product
function isUnique(product) {
  const productSku = product.sku;
  const isValid = products.filter(p => p.sku === productSku);

  if (isValid.length === 0) {
    return true;
  }
  return false;
}

module.exports = router;

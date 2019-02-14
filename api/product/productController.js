const { Product } = require("./productModel");

const handleProduct = product => {
  product.inventory.quantity = product.inventory.warehouses.length;
  product.isMarketable = product.inventory.quantity > 0;

  return product;
};

module.exports = {
  getProducts: async (req, res) => {
    const products = await Product.find({});

    res.send(products);
  },
  getProduct: async ({ params }, res) => {
    const specificProduct = await Product.findOne({sku: params.sku}).lean();

    if (!specificProduct) {
      return res.status(404).send();
    }

    res.send(handleProduct(specificProduct));
  },
  addProduct: async ({ body }, res) => {
    try {
      const newProduct = await new Product(body).save();

      res.status(201).send(await Product.findById(newProduct._id));
    } catch (e) {
      res.status(406).send(e.message);
    }
  },
  editProduct: async ({ params, body }, res) => {
    try {
      const product = await Product.findOneAndUpdate(
        { sku: params.sku },
        { $set: { ...body } },
        { new: true }
      );

      res.status(200).send(product);
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
  deleteProduct: async ({ params }, res) => {
    try {
      const deleleted = await Product.remove({ sku: params.sku });

      if (deleleted.n === 0) {
        res.status(404).end("Product not found.");
      } else {
        res.status(200).send();
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
};

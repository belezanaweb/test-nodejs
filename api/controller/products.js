module.exports = ({ test }) => {
  const products = test
    ? require("../../__tests__/testProducts.json")
    : require("../data/products.json");
  const controller = {};

  const getProductFromSKU = (sku) => {
    for (var i = 0; i < products.items.length; i++) {
      if (products.items[i].sku.toString() === sku.toString()) {
        return products.items[i];
      }
    }
    return -1;
  };

  const getProductIndexSKU = (sku) => {
    for (let i = 0; i < products.items.length; i++) {
      if (products.items[i].sku.toString() === sku.toString()) {
        return i;
      }
    }
    return -1;
  };

  const getWeregouseIndex = (warehouses, name) => {
    for (var i = 0; i < warehouses.length; i++) {
      if (warehouses[i].locality.toLowerCase() === name.toLowerCase()) {
        return warehouses[i];
      }
    }
    return -1;
  };

  controller.getProducts = (req, res) => res.status(200).json(products);

  controller.getProduct = (req, res) => {
    const product = getProductFromSKU(req.params.id);
    if (product !== -1) {
      const warehouse = getWeregouseIndex(
        product.inventory.warehouses,
        req.params.locality
      );
      if (warehouse !== -1) {
        warehouse.quantity--;
        product.inventory.quantity--;
        if (product.inventory.quantity < 1) {
          product.isMarketable = false;
        }
        res.status(200).json({ message: "success" });
        return;
      } else {
        res.status(400).send({
          error: `localizacao \'${req.params.locality}\' nao encontrada.`,
        });
        return;
      }
    }
    res.status(400).send({
      error: `produto com codigo sku \'${req.params.id}\' nao encontrado.`,
    });
  };

  controller.newProduct = (req, res) => {
    const exists = getProductFromSKU(req.body.sku) !== -1;
    if (exists) {
      res.status(400).send({ error: "produto de mesmo codigo sku ja existe" });
      return;
    }
    const newProduct = req.body;
    let quantity = 0;
    newProduct.inventory.warehouses.forEach(
      (location) => (quantity += location.quantity)
    );
    newProduct.inventory.quantity = quantity;
    newProduct.isMarketable = quantity > 0;
    products.items[products.items.length] = newProduct;
    res.status(200).send({ message: "produto adicionado com sucesso" });
  };

  controller.editProduct = (req, res) => {
    const pIndex = getProductIndexSKU(req.body.sku);
    if (pIndex !== -1) {
      products.items.splice(pIndex, 1, req.body);
      res.status(200).send({ message: "produto editado com sucesso" });
      return;
    }
    res.status(400).send({
      error: `produto com codigo sku \'${req.body.sku}\' nao encontrado.`,
    });
  };

  controller.deleteProduct = (req, res) => {
    const pIndex = getProductIndexSKU(req.params.id);
    if (pIndex !== -1) {
      products.items.splice(pIndex, 1);
      res.status(200).send({ message: "produto removido com sucesso" });
      return;
    }
    res.status(400).send({
      error: `produto com codigo sku \'${req.params.sku}\' nao encontrado.`,
    });
  };

  return controller;
};

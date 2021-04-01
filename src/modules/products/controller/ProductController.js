import products from "../data/product";

class ProductController {
  create(req, res) {
    try {
      const new_product = req.body;

      if (products.find((obj) => obj.sku === new_product.sku)) {
        res.status(404).end("produto já cadastrado");
      } else {
        products.push(new_product);
        res.status(201).json(products);
      }
    } catch (error) {
      res.status(500).json({ error: errormessage });
    }
  }

  fetch(req, res) {
    try {
      const sku = parseInt(req.params.sku);

      if (!sku) {
        res.status(400).end("sku não informado");
      }

      const productBySku = products.find((prod) => prod.sku === sku);

      products[0].inventory.quantity = products[0].inventory.warehouses.reduce(
        (acumulador, elemento) => acumulador + elemento.quantity,
        0
      );

      if (products[0].inventory.quantity > 0) {
        products[0].isMarketable = true;
      } else {
        products[0].isMarketable = false;
      }

      if (productBySku) {
        res.status(200).json(productBySku);
      } else {
        res.status(404).end("sku não encontrado");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  remove(req, res) {
    try {
      const sku = parseInt(req.params.sku);

      if (!sku) {
        res.status(400).end("sku não informado");
      }
      const product = products.filter((prod) => prod.sku === sku)[0];

      if (product) {
        products = products.filter((prod) => prod.sku !== sku);
        res.status(200).send({ message: "Produto excluído" });
      } else {
        res.status(404).end("sku não encontrado");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  edit(req, res) {
    try {
      const skuParam = parseInt(req.params.sku);
      const product = products.filter((prod) => prod.sku === skuParam)[0];

      if (!product) {
        res.status(404).send("sku não encontrado");
      }
      const { sku, name, inventory } = req.body;
      if (!name || !inventory) {
        res
          .status(400)
          .end("Verifique se você está passando algum dado no body");
      }

      product.sku = sku;
      product.name = name;
      product.inventory = inventory;

      return res.status(200).send({ message: "Produto editado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
export default ProductController;

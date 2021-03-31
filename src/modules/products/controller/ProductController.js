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
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }

  fetch(req, res) {
    try {
      const sku = parseInt(req.params.sku);

      if (!sku) {
        res.status(400).end("sku não informado");
      }

      const productBySku = products.find((prod) => prod.sku === sku);

      if (productBySku) {
        res.status(200).json(productBySku);
      } else {
        res.status(404).end("sku não encontrado");
      }
    } catch (err) {
      console.log(err);
    }
  }

  remove(req, res) {
    try {
      const sku = parseInt(req.params.sku);

      if(!sku){
        res.status(400).end("sku não informado");
      }
      const product = products.filter((prod) => prod.sku === sku)[0];

      if (product) {
        products = products.filter((prod) => prod.sku !== sku);
        res.status(200).send({message: "Produto excluído"})
      } else {
        res.status(404).end("sku não encontrado");
      }

    } catch (error) {
      res.status(500).json({ err: err.message });
    }
  }
}
export default ProductController;

const connection = require("../../database/connection");

module.exports = {
  async index(request, response) {
    const { sku } = request.params;

    const products = await connection("produtos_boticario")
      .select("*")
      .where("sku", sku)
      .first();

    try {
      const total = products.inventory.warehouses;

      totalProducts = 0;
      total.forEach((element) => {
        totalProducts += element?.quantity;
      });

      products.quantity = totalProducts;
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Não Existe este produto cadastrado" });
    }

    return response.json(products);
  },

  async sumTotalQuantity(request, response) {
    const { sku } = request.params;

    const products = await connection("produtos_boticario")
      .select("*")
      .where("sku", sku);

    let somaTotal = 0;
    for (let value of products) {
      for (let quantidade of value.inventory.warehouses) {
        somaTotal += quantidade?.quantity ?? 0;
      }
    }

    products.forEach((element) => {
      element.quantity = somaTotal;
    });

    return response.json(products);
  },

  async store(request, response) {
    const { sku, name, inventory } = request.body;
    let validateisMarketable = true;

    const products = await connection("produtos_boticario")
      .select("*")
      .where("sku", sku)
      .first();

    if (products != undefined) {
      console.log("Produto já cadastrado");
      return response.status(400).json({ error: "Produto já cadastrado" });
    }

    let somaTotal = 0;
    for (let quantidade of inventory.warehouses) {
      somaTotal += quantidade?.quantity ?? 0;
    }

    if (somaTotal === 0) {
      validateisMarketable = false;
    }

    try {
      const data = await connection("produtos_boticario").insert({
        sku,
        name,
        inventory,
        isMarketable: validateisMarketable,
      });
    } catch (error) {
      return response.status(400).json({ error: "Error" });
    }

    return response.json({ sku, name, inventory });
  },

  async update(request, response) {
    const { sku } = request.params;
    const data = request.body;

    const product = await connection("produtos_boticario")
      .where("sku", "=", sku)
      .update(data);

    return response.json({ product });
  },

  async delete(request, response) {
    const { sku } = request.params;
    const product = await connection("produtos_boticario")
      .where("sku", sku)
      .first();

    if (product == []) {
      return response.status(401).json({ error: "Produto nao exite na lista" });
    }

    await connection("produtos_boticario").where("sku", sku).delete();

    return response.status(204).send();
  },
};

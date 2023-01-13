const connection = require("../database/connection");

module.exports = {
  async getBySku(sku) {
    try {
      return await connection("products").select("*").where("sku", sku).first();
    } catch (error) {
      throw error;
    }
  },

  async existsBySku(sku) {
    try {
      const product = await connection("products")
        .select("sku")
        .where("sku", sku)
        .first();
      return product && product.sku ? true : false;
    } catch (error) {
      throw error;
    }
  },

  async update(product) {
    try {
      return await connection("products")
        .where("sku", "=", product.sku)
        .update(product);
    } catch (error) {
      throw error;
    }
  },

  async insert(product) {
    try {
      await connection("products").insert(product);
    } catch (error) {
      throw error;
    }
  },

  async delete(sku) {
    try {
      await connection("products").del().where("sku", "=", sku);
    } catch (error) {
      throw error;
    }
  },
};

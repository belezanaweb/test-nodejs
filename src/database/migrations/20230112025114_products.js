exports.up = function (knex) {
  return knex.schema.createTable("products", function (table) {
    table.integer("sku").primary();
    table.string("name");
    table.json("inventory");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products");
};

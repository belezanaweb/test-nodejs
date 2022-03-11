exports.up = function (knex) {
  return knex.schema.createTable("produtos_boticario", function (table) {
    table.increments("id");
    table.integer("sku");
    table.string("name");
    table.json("inventory");
    table.boolean("isMarketable").defaultTo(true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("produtos_boticario");
};

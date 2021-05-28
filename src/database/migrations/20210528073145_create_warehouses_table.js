const knex = require('../../../knexfile')

/*
* O uso de sku e uuid facilita posteriormente pesquisas por
* disponibilidade por localidade, evitando buscas em árvore.
*/

exports.up = async knex => {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    
    return knex.schema.createTable('warehouses', (table) => {
        table.uuid('warehouse_id')
            .primary()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('locality', 255);
        table.integer('quantity')
            .unsigned()
            .notNullable();
        table.string('type');
        table.integer('product_sku')
            .references('sku')
            .inTable('products');
        table.unique(['warehouse_id', 'product_sku'])
    })
  
};

exports.down = async knex => await knex.schema.dropTableIfExists('warehouses');
const knex = require('../../../knexfile');

/**
 * A ideia de produto é por si uma ideia abstrata,
 * logo não há porquê guardar informações derivativas
 * como as previstas em 'inventory'. Ou seja, 'invetory'
 * é uma função de relação a um vetor de 'warehouse'
 * e um 'produto'.
 */

exports.up = async knex => {
    return knex.schema.createTable('products', (table) => {
        table.integer('sku')
            .unique()
            .notNullable()
            .primary();
        table.string('name', 255);
    })
}

exports.down = async knex => await knex.schema.dropTableIfExists('products')
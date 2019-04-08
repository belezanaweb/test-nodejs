const mongoMlab = require('../conectaBanco/conectMongo');

const depositoProdutoSchem = new mongoMlab.Schema({
    locality: String,
    quantity: String,
    type: String
});

const produtoSchema = new mongoMlab.Schema({

    sku: String,
    name: String,
    inventory: {
        quantity: Number,
        warehouses: [depositoProdutoSchem]
    },
    isMarketable: Boolean

});

const produtosModel = mongoMlab.model('produtos', produtoSchema);

module.exports = produtosModel;
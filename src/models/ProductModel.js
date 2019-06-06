const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    sku: Number,
    name: { type: String, required: true },
    inventory: {
        quantity: Number,
        warehouses: [
            {
                locality: { type: String, required: true },
                quantity: { type: Number, required: true },
                _type: { type: String, required: true } // type é uma propriedade reservada do mongo, então adicionei o _
            },
        ],
    },
    isMarketable: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Product', ProductSchema);

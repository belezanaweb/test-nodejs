const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    sku: String,
    name: String,
    isMarketable: { type: Boolean, default: false }
});

module.exports = mongoose.model('products', ProductSchema);
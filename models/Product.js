const mongoose = require('mongoose');
const { Schema } = mongoose;
const WarehouseSchema = require('./Warehouse');

const ProductSchema = new Schema({
    sku: String,
    name: String,
    warehouses: [WarehouseSchema]
});

module.exports = mongoose.model('products', ProductSchema);
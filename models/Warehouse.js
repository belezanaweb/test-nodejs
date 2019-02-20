const mongoose = require('mongoose');
const { Schema } = mongoose;

const WarehouseSchema = new Schema({
    locality: String,
    quantity: Number,
    type: String
    
});

module.exports = WarehouseSchema;
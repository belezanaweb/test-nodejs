const mongoose = require('mongoose');
const { Schema } = mongoose;
const WarehouseSchema = require('./Warehouse');

const InventorySchema = new Schema({
    skuId: { type: Schema.Types.ObjectId },
    quantity: Number,
    warehouses: [WarehouseSchema]
    
});

module.exports = mongoose.model('inventory', InventorySchema);
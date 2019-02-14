const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const productSchema = new Schema({
  sku: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  inventory: {
    warehouses: [
      {
        locality: { type: String },
        quantity: { type: Number },
        type: { type: String }
      }
    ]
  }
});

productSchema.plugin(uniqueValidator, {
  message: "Dois produtos são considerados iguais se os seus skus forem iguais."
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };

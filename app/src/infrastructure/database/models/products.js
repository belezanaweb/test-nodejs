import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schemaProducts = new Schema({
  sku: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: false,
    default: 0
  },
  isMarketable: {
    type: Boolean,
    required: false,
    default: false
  },
  inventory: {
    warehouses: [
      {
        locality: {
          type: String,
          required: true,
          trim: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
});
export default mongoose.model("products", schemaProducts);

import { Schema, model } from "mongoose";
import { IProduct } from "../../entities/products/Product";

const Product = model<IProduct>(`Product`, new Schema<IProduct>({
  sku: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  inventory: {
    warehouses: [{
      locality: { type: String, required: true },
      quantity: { type: Number, required: true },
      type: { type: String, required: true }
    }]
  },
  isDeleted: { type: Boolean, required: true}
}))

export { Product }
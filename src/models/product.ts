import { Schema, model, Document } from 'mongoose'

interface IProduct extends Document {
  sku?: number,
  name?: string,
  inventory?: {
    quantity?: Number,
    warehouses?: [
      {
        locality?: String,
        quantity?: Number,
        type?: String
      }
    ]
  },
  isMarketable?: boolean
}

const productSchema = new Schema({
  sku: Number,
  name: String,
  inventory: {
    quantity: Number,
    warehouses: {

    }
  },
  isMarketable: Boolean
}, { timestamps: true })

const Product = model<IProduct>('Product', productSchema)

export default Product

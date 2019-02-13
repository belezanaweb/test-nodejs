import { model, Schema } from 'mongoose';
import { IProduct, IWarehouses } from '../resources/interfaces';

const ProductSchema = new Schema(
  {
    inventory: {
      quantity: { type: Number },
      warehouses: [
        {
          locality: { type: String, required: true },
          quantity: { type: Number, required: true },
          type: { type: String, required: true },
        },
      ],
    },
    isMarketable: { type: Boolean },
    name: { type: String, required: true },
    sku: { type: Number, required: true },
  },
  { timestamps: true, collection: 'products' },
);

ProductSchema.post(
  'findOne',
  (product: IProduct): IProduct | null => {
    if (!product) {
      return null;
    }
    product.inventory.quantity = product.inventory.warehouses.reduce(
      (total: number, current: IWarehouses): number => {
        return (total += current.quantity);
      },
      0,
    );
    product.isMarketable = product.inventory.quantity ? true : false;
    return product;
  },
);

ProductSchema.post(
  'findOneAndUpdate',
  async (product: IProduct): Promise<IProduct> => {
    delete product.isMarketable;
    delete product.inventory.quantity;
    return await product.save();
  },
);

export default model<IProduct>('Product', ProductSchema);

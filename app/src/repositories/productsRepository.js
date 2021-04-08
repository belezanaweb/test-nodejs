import mongoose from "mongoose";
import createError from "http-errors";
import HTTP_STATUS_CODE from "../constants/httpStatusCode.js";
import MESSAGES from "../constants/messages.js";
import products from "../infrastructure/database/models/products.js";
import _ from "lodash";
mongoose.model("products");

const isProductExists = async (
  sku,
  validation,
  errorMessage,
  errorStatusCode
) => {
  const isProductExists = await products.find({ sku: sku });
  if (_.isEmpty(isProductExists) === validation) {
    throw createError(errorMessage, errorStatusCode);
  }
};

class Products {
  async create(body) {
    const { sku } = body;
    await isProductExists(
      sku,
      false,
      MESSAGES.ERROR.PRODUCT_ALREADY_EXISTS,
      HTTP_STATUS_CODE.CONFLICT
    );
    const newProduct = new products(body);
    await newProduct.save();
    return {
      message: MESSAGES.SUCCESS.PRODUCT_CREATED,
      statusCode: HTTP_STATUS_CODE.CREATED,
    };
  }

  async update(body, sku) {
    await isProductExists(
      sku,
      true,
      MESSAGES.ERROR.INVALID_PRODUCT,
      HTTP_STATUS_CODE.NOT_FOUND
    );
    await products.findOneAndUpdate({ sku: sku }, body);
    return {
      message: MESSAGES.SUCCESS.PRODUCT_UPDATED,
      statusCode: HTTP_STATUS_CODE.NO_CONTENT,
    };
  }

  async delete(sku) {
    await isProductExists(
      sku,
      true,
      MESSAGES.ERROR.INVALID_PRODUCT,
      HTTP_STATUS_CODE.NOT_FOUND
    );
    await products.findOneAndDelete({ sku: sku });
    return {
      message: MESSAGES.SUCCESS.PRODUCT_DELETED,
      statusCode: HTTP_STATUS_CODE.ACCEPTED,
    };
  }

  async get(skuId) {
    await isProductExists(
      skuId,
      true,
      MESSAGES.ERROR.INVALID_PRODUCT,
      HTTP_STATUS_CODE.NOT_FOUND
    );
    const {inventory, quantity, isMarketable, sku, name} = await products.findOneAndUpdate({ sku: skuId }, {$inc: { quantity: 1}, isMarketable: true}, { __v: 0, _id: 0 });
    const wareHouses = inventory.warehouses;
    let productResponse = {sku, name, inventory:{quantity: quantity +1, wareHouses}, isMarketable};
    return {
      message: productResponse,
      statusCode: HTTP_STATUS_CODE.OK,
    };
  }
}

export default Products;

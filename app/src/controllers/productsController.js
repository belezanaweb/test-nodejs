import { errorResponseUtils } from "../utils/responseUtil.js";
import Products from "../repositories/productsRepository.js";

/**
 * Handler responsible for create products
 * @param {Request} req
 * @param {Response} res
 */
export const create = async (req, res) => {
  try {
    const { body } = req;
    const products = new Products();
    const response = await products.create(body);
    res.status(response.statusCode).send({ message: response.message });
  } catch (error) {
    const errorResponse = errorResponseUtils(error.statusCode, error);
    return res.status(errorResponse.statusCode).send(errorResponse.body);
  }
};

/**
 * Handler responsible for update products
 * @param {Request} req
 * @param {Response} res
 */
export const update = async (req, res) => {
  try {
    const { body, params } = req;
    const products = new Products();
    const response = await products.update(body, Number(params.productSku));
    res.status(response.statusCode).send({ message: response.message });
  } catch (error) {
    const errorResponse = errorResponseUtils(error.statusCode, error);
    return res.status(errorResponse.statusCode).send(errorResponse.body);
  }
};

/**
 * Handler responsible for delete products
 * @param {Request} req
 * @param {Response} res
 */
export const del = async (req, res) => {
  try {
    const { params } = req;
    const products = new Products();
    const response = await products.delete(Number(params.productSku));
    res.status(response.statusCode).send({ message: response.message });
  } catch (error) {
    const errorResponse = errorResponseUtils(error.statusCode, error);
    return res.status(errorResponse.statusCode).send(errorResponse.body);
  }
};

/**
 * Handler responsible for get products
 * @param {Request} req
 * @param {Response} res
 */
export const get = async (req, res) => {
  try {
    const { params } = req;
    const products = new Products();
    const response = await products.get(Number(params.productSku));
    res.status(response.statusCode).send(response.message);
  } catch (error) {
    const errorResponse = errorResponseUtils(error.statusCode, error);
    return res.status(errorResponse.statusCode).send(errorResponse.body);
  }
};

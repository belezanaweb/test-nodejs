const { StatusCode } = require("status-code-enum");
const ProductRepository = require("../repositories/product");
const Product = require("../models/product");
const Error = require("../models/error");

module.exports = {
  async create(request, response) {
    try {
      const product = new Product(request.body);

      const existingProduct = await ProductRepository.existsBySku(product.sku);

      if (existingProduct) {
        throw {
          statusCode: StatusCode.ClientErrorConflict,
          errors: new Error("Produto já cadastrado."),
        };
      }

      await await ProductRepository.insert({
        ...product,
        inventory: JSON.stringify(product.inventory),
      });

      return response.status(StatusCode.SuccessCreated).json(product);
    } catch (error) {
      if (error.statusCode)
        return response.status(error.statusCode).json(error.errors);
      else
        return response
          .status(StatusCode.ServerErrorInternal)
          .json(
            new Error(`Não foi possível cadastrar o produto no banco de dados.`)
          );
    }
  },

  async update(request, response) {
    try {
      const product = new Product({ ...request.body, ...request.params });

      const existingProduct = await ProductRepository.existsBySku(product.sku);

      if (!existingProduct) {
        throw {
          statusCode: StatusCode.ClientErrorNotFound,
          errors: new Error("Produto não encontrado."),
        };
      }

      await ProductRepository.update({
        ...product,
        inventory: JSON.stringify(product.inventory),
      });

      return response.status(StatusCode.SuccessOK).json(product);
    } catch (error) {
      if (error.statusCode)
        return response.status(error.statusCode).json(error.errors);
      else
        return response
          .status(StatusCode.ServerErrorInternal)
          .json(
            new Error(`Não foi possível atualizar o produto no banco de dados.`)
          );
    }
  },

  async get(request, response) {
    try {
      const { sku } = request.params;

      const product = await ProductRepository.getBySku(sku);

      if (!product) {
        throw {
          statusCode: StatusCode.ClientErrorNotFound,
          errors: new Error("Produto não encontrado."),
        };
      }

      product.inventory = JSON.parse(product.inventory);

      product.inventory.quantity = product.inventory.warehouses.reduce(
        (quantity, warehouse) => {
          return quantity + warehouse.quantity;
        },
        0
      );

      product.isMarketable = product.inventory.quantity > 0;

      return response.status(StatusCode.SuccessOK).json(product);
    } catch (error) {
      if (error.statusCode)
        return response.status(error.statusCode).json(error.errors);
      else
        return response
          .status(StatusCode.ServerErrorInternal)
          .json(
            new Error(`Não foi possível consultar o produto no banco de dados.`)
          );
    }
  },

  async delete(request, response) {
    try {
      const { sku } = request.params;

      const existingProduct = await ProductRepository.existsBySku(sku);

      if (!existingProduct) {
        throw {
          statusCode: StatusCode.ClientErrorNotFound,
          errors: new Error("Produto não encontrado."),
        };
      }

      await ProductRepository.delete(sku);

      return response.status(StatusCode.SuccessNoContent).json();
    } catch (error) {
      if (error.statusCode)
        return response.status(error.statusCode).json(error.errors);
      else
        return response
          .status(StatusCode.ServerErrorInternal)
          .json(
            new Error(`Não foi possível remover o produto no banco de dados.`)
          );
    }
  },
};

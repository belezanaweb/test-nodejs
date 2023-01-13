const { body, param, validationResult } = require("express-validator");
const { StatusCode } = require("status-code-enum");

const skuBody = body("sku")
  .exists()
  .withMessage("É obrigatório informar a sku do produto.")
  .isInt({ min: 1 })
  .withMessage("O nº do sku informado está inválido.");

const skuParam = param("sku")
  .exists()
  .withMessage("É obrigatório informar a sku do produto.")
  .isInt({ min: 1 })
  .withMessage("O nº do sku informado está inválido.");

const name = body("name")
  .exists()
  .withMessage("É obrigatório informar o nome do produto.")
  .isLength({ min: 5 })
  .withMessage("O nome do produto deve ter no mínimo 5 letras.")
  .isLength({ max: 220 })
  .withMessage("O nome do produto deve ter no máximo 220 letras.");

const inventory = body("inventory")
  .exists()
  .withMessage("É obrigatório informar o inventário do produto.");

const warehouses = body("inventory.warehouses")
  .custom(
    (warehouses) => warehouses && warehouses.length > 0 && warehouses.length > 0
  )
  .withMessage("É obrigatório informar o(s) armazém(s) do produto.");

const locality = body("inventory.warehouses.*.locality")
  .exists()
  .withMessage("É obrigatório informar a localidade do armazém.")
  .isLength({ min: 1 })
  .withMessage("A localidade do armazém deve ter no mínimo 1 letra.")
  .isLength({ max: 220 })
  .withMessage("A localidade do armazém deve ter no máximo 220 letras.");

const quantity = body("inventory.warehouses.*.quantity")
  .exists()
  .withMessage("É obrigatório informar a quantidade do produto no armazém.")
  .isInt({ min: 0 })
  .withMessage(
    "A quantidade do produto no armazém deve ser maior ou igual a zero."
  );

const type = body("inventory.warehouses.*.type")
  .exists()
  .withMessage("É obrigatório informar o tipo do armazém.")
  .isLength({ min: 1 })
  .withMessage("O tipo do armazém deve ter no mínimo 1 letra.")
  .isLength({ max: 220 })
  .withMessage("O tipo do armazém deve ter no máximo 220 letras.");

const createRules = [
  skuBody,
  name,
  inventory,
  warehouses,
  locality,
  quantity,
  type,
];

const updateRules = [
  skuParam,
  name,
  inventory,
  warehouses,
  locality,
  quantity,
  type,
];

const skuRule = [skuParam];

const checkRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(StatusCode.ClientErrorUnprocessableEntity)
      .json({ messages: errors.array() });
  }
  next();
};

module.exports = {
  createRules,
  updateRules,
  skuRule,
  checkRules,
};

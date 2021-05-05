import { body } from "express-validator";

export const UpdateProductsValidator = () => [
  body("sku").notEmpty().withMessage("sku invalido"),
  body("name").notEmpty().withMessage("name invalido"),
  body("inventory").notEmpty().withMessage("inventory invalido"),
  body("inventory.warehouses")
    .isArray()
    .withMessage("warehouses invalido")
    .notEmpty()
    .withMessage("warehouses invalido"),
  body("inventory.warehouses.*.quantity")
    .exists()
    .withMessage("quantity não existe")
    .not()
    .isString()
    .withMessage("quantity invalido"),
];

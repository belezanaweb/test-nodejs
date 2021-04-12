const { body, validationResult } = require('express-validator')

const productValidator = () => {
  return [
    body("sku").notEmpty().withMessage("sku invalido"),
    body("name").notEmpty().withMessage("name invalido"),
    body("inventory").notEmpty().withMessage("inventory invalido"),
    body("inventory.warehouses")
        .isArray().withMessage("warehouses invalido")
        .notEmpty().withMessage("warehouses invalido"),
    body("inventory.warehouses.*.quantity")
        .exists().withMessage("quantity não existe")
        .not().isString().withMessage("quantity invalido")
  ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) { 
      return next()
    }
    return res.status(400).json({message: errors.array()})
  }
  
  module.exports = {
    productValidator,
    validate,
  }
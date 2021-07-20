import * as yup from 'yup';

class ProductSchemas {
  public static insert () {
    return yup
    .object()
    .shape({
      sku: yup.number().required().positive().integer(),
      name: yup.string().required(),
      inventory: yup.object({
        warehouses: yup.array().of(
          yup.object().shape({
            locality: yup.string().required(),
            quantity: yup.number().required(),
            type: yup.string().required(),
          }),
        ).required(),
      }),
    })
  }

  public static update () {
    return yup
    .object()
    .shape({
      name: yup.string().required(),
      inventory: yup.object({
        warehouses: yup.array().of(
          yup.object().shape({
            locality: yup.string(),
            quantity: yup.number(),
            type: yup.string(),
          }),
        ).required(),
      }),
    })

  }
}

export default ProductSchemas;

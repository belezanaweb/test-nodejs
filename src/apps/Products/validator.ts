import yup from '@config/yup';
import { NextFunction, Request, Response } from 'express';

export const validateProductsPayload = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    await yup
      .object()
      .shape({
        sku: yup.number().required().positive().integer(),
        name: yup.string().required(),
        inventory: yup.object({
          wharehouses: yup.array().of(
            yup.object().shape({
              locality: yup.string(),
              quantity: yup.number(),
              type: yup.string(),
            }),
          ),
        }),
      })
      .validate(req.body, { abortEarly: false, strict: true });

    return next();
  } catch (e) {
    return res.status(400).json({ e });
  }
};

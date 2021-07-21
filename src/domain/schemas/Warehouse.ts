import Joi from 'joi';

export default Joi.object({
    locality: Joi
        .string()
        .uppercase()
        .required(),
    quantity: Joi
        .number()
        .required(),
    type: Joi
        .string()
        .uppercase()
        .required(),
});

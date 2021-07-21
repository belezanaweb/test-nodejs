import Joi from 'joi';

export default Joi.object({
    sku: Joi
        .number()
        .required(),
});

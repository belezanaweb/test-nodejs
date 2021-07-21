import Joi from 'joi';

import inventory from './Inventory';

export default Joi.object({
    sku: Joi.number().required(),
    name: Joi.string().uppercase().required(),
    inventory,
});

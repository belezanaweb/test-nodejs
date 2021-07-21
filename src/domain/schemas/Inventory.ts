import Joi from 'joi';

import warehouse from './Warehouse';

export default Joi.object({
    warehouses: Joi
        .array()
        .items(warehouse)
        .required(),
});

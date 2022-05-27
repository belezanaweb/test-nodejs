import * as Yup from 'yup';

export default {
    sku: Yup.number().required(),
    name: Yup.string().min(6).required(),
    inventory: Yup.object().shape({
        warehouses: Yup.array()
            .of(
                Yup.object().shape({
                    locality: Yup.string().min(2).required(),
                    quantity: Yup.number().min(0).required(),
                    type: Yup.string().min(3).required()
                })
            ).required()
    }).required()
}
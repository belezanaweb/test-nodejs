exports.create = async req => {

    try {
        const db = req.app.src.config.db.models

        const data = await db.product.findOrCreate({
            where: {
                sku: req.body.sku
            },
            defaults: req.body,
            include: [db.inventory]
        }
        )
            .then(([result, created]) => {
                if (!created) return 'Produto já existe.'
                return 'Produto cadastrado.'
            })

        return data
    }
    catch (err) {
        throw err
    }
}

exports.update = async req => {

    try {
        const db = req.app.src.config.db.models

        const data = await db.product.update(req.body, {
            where: {
                sku: req.body.sku
            }
        })

        return data
    }
    catch (err) {
        throw err
    }
}

exports.remove = async req => {

    try {
        const db = req.app.src.config.db.models

        const data = await db.product.destroy({
            where: {
                sku: req.body.sku
            }
        })

        return data
    }
    catch (err) {
        throw err
    }
}

exports.get = async req => {

    try {
        const db = req.app.src.config.db.models

        const data = await db.product.findOne({
            attributes: ['sku', 'name'],
            where: {
                sku: req.body.sku
            },
            include: [{
                model: db.inventory,
                attributes: ['warehouses']
            }]
        })

        // Soma a quantidade do produto
        const quantities = (value) => value.quantity
        const sum = (prev, next) => prev + next
        data.dataValues.quantity = data.dataValues.inventory.dataValues.warehouses.map(quantities).reduce(sum)

        // Atribui TRUE se o valor de quantity não for 0
        data.dataValues.isMarketable = data.dataValues.quantity ? true : false

        return data
    }
    catch (err) {
        throw err
    }
}
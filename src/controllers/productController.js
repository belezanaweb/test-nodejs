const repository = require('../repositories/productRepository')

exports.create = async (req, res) => {
    try {
        const data = await repository.create(req)

        res.status(201).send({
            data: {},
            message: data,
        })
    }
    catch (err) {
        res.status(500).send({
            data: {},
            message: 'Bad request',
            erro: err.toString()
        })
    }
}

exports.update = async (req, res) => {
    try {
        const data = await repository.update(req)

        if (data[0]) {
            res.status(202).send({
                data: {},
                message: 'Produto atualizado',
            })
            return
        }

        res.status(202).send({
            data: {},
            message: 'Produto não encontrado'
        })
    }
    catch (err) {
        res.status(500).send({
            data: {},
            message: 'Bad request',
            erro: err.toString()
        })
    }
}

exports.remove = async (req, res) => {
    try {
        const data = await repository.remove(req)

        if (data) {
            res.status(202).send({
                data: {},
                message: 'Produto removido',
            })
            return
        }

        res.status(202).send({
            data: {},
            message: 'Produto não encontrado'
        })
    }
    catch (err) {
        res.status(500).send({
            data: {},
            message: 'Bad request',
            erro: err.toString()
        })
    }
}

exports.get = async (req, res) => {
    try {
        const data = await repository.get(req)

        if (data) {
            res.status(200).send({
                data,
                message: 'Produto encontrado',
            })
            return
        }

        res.status(200).send({
            data: {},
            message: 'Produto não encontrado'
        })
    }
    catch (err) {
        res.status(500).send({
            data: {},
            message: 'Bad request',
            erro: err.toString()
        })
    }
}
const error = require('integrations/express/error-hander')
const call = (controller, method) => {
    return async (req, res) => {
        try {
            const obj = {
                error,
                payload: req.body || null,
                params: req.params || null
            }
            const data = await controller[method](obj)
            const code = method === 'post' ? 201 : 200
            res.status(code).json(data)
        } catch (error) {
            res.status(error.code || 500).json(error)
        }
    }
}

module.exports = call
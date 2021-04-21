const responseHandler = async (result, req, res, next) => {
    const { status = 500, body } = result
    let responseBody = { status: 'Sucesso', ...body}

    if(status < 200 || status > 299) {
        const message = result.message || 'Ops! Alguma coisa deu errado.'

        responseBody = {
            status: 'Erro',
            message
        }

    }

    res.status(status).json(responseBody)
}

export { responseHandler }
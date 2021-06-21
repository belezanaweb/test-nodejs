const db = require('../database/index.js')

exports.post = (req, res, next) => {
  if(!req.body.sku) {
    return res.status(400).send({
      message: "Os dados do produto não pode estar vazio"
    })
  }
  db.create(req.body)
    .then(data => {
      res.status(data.status).send(data)
    }).catch(err => {
      res.status(500).send({
        message: err.message || 'Ocorreu um erro no servidor'
      })
    })
}

exports.findAll = (req, res) => {
  db.getAll()
    .then(products => {
        res.send(products)
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Ocorreu um erro no servidor'
        })
    })
}

exports.findOne = async (req, res, next) => {
  if(!req.params.sku) {
    return res.status(404).send({
      message: `SKU ${req.params.sku} não informado`
    })
  }
  db.getBySKU(req.params.sku)
    .then(resp => {
      res.status(resp.status).send(resp.data || resp)
    }).catch(err => {
      res.status(500).send({
        message: err.message || 'Ocorreu um erro no servidor'
      })
    })
}

exports.put = async (req, res, next) => {
  db.update(req.params.sku, req.body)
    .then(resp => {
      res.status(resp.status).send(resp)
    }).catch(err => {
      res.status(500).send({
        message: err.message || 'Ocorreu um erro no servidor'
      })
    })
}

exports.delete = async (req, res, next) => {
  db.delete(req.params.sku)
  .then(resp => {
    res.status(resp.status).send(resp)
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Ocorreu um erro no servidor'
    })
  })
}


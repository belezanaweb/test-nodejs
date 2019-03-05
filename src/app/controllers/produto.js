const logger = require('../utils/logger');
const service = require('../service/produtoService');

module.exports = (app) => {
  const ProdutosController = {
    criar(req, res) {
      const produto = req.body;
      try {
        service.criar(produto);
        res.status(201).send({message: 'Registro criado com sucesso.'});
      } catch(e) {
        logger.error(e);
        res.status(400).send({message: e.message});
      }
    },
    editar(req, res) {
      const produto = req.body;
      try {
        service.editar(produto);
        res.status(200).send({message: 'Registro editado com sucesso.'});
      } catch(e) {
        logger.error(e);
        res.status(400).send({message: e.message});
      }
    },
    buscar(req, res) {
      const sku = Number(req.params.sku);
      const produto = service.buscar(sku);
      if (produto) {
        res.status(200).json(produto);
      } else {
        res.status(404).json({message: `Registro com sku ${sku} não existe.`});
      }
    },
    deletar(req, res) {
      const sku = Number(req.params.sku);
      const deletado = service.deletar(sku);
      if (deletado) {
        res.status(200).json({message: 'Registro excluído com sucesso.'});
      } else {
        res.status(404).json({message: `Registro com sku ${sku} não existe.`});
      }
    }
  };

  return ProdutosController;
}

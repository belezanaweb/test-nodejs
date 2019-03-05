module.exports = (app) => {
  const {produto} = app.controllers;
  app.post('/produto', produto.criar);
  app.put('/produto', produto.editar);
  app.get('/produto/:sku', produto.buscar);
  app.delete('/produto/:sku', produto.deletar);
};

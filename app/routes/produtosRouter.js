module.exports = (api) => {

	api.post('/cadastrar-produtos', (req, res) => {
		api.app.controllers.produtosController.cadastrarProdutos(req, res);
	});

	api.put('/atualizar-produtos/:sku', (req, res) => {
		api.app.controllers.produtosController.atualizarProdutos(req, res);
	});

	api.get('/mostrar-produto/:sku', (req, res) => {
		api.app.controllers.produtosController.mostrarProduto(req, res);
	});

	api.delete('/remover-produto/:sku', (req, res) => {
		api.app.controllers.produtosController.removerProdutos(req, res);
	});

};
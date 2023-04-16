// ENUM para facilitar passagem de erros para camada anterior
const Errors = {
    INVALIDO: {error: 'Payload invalido.', status: 406},
    DUPLICADO: {error: 'Produto já existe.', status: 406},
    INEXISTE: {error: 'Produto não existe.', status: 406},
}

class ProdutosService {
    constructor(repository) {
        this.repository = repository;
    }

    criarProduto(payload) {
        // Verificação de payload.
        // Validações são ideais em um Middleware atendendo a camada de rotas.
        if(!payload.sku || !payload.name) throw (Errors.INVALIDO);

        // Verifica se sku existe.
        const existe = this.repository.recuperarPorSku(payload.sku);
        if (existe)  throw (Errors.DUPLICADO);

        return this.repository.criar(payload);
    }

    editarProduto(sku, payload) {
        // Verifica existência de sku.
        const existe = this.repository.recuperarPorSku(parseInt(sku));
        if (!existe) throw (Errors.INEXISTE);

        // Adiciona o sku para realizar edição no repositório.
        payload.sku = parseInt(sku);
        return this.repository.editar(payload);
    }

    recuperarProduto(sku) {
        // Verifica existência de sku e usa objeto já retornado.
        const existe = this.repository.recuperarPorSku(parseInt(sku));
        if (!existe) throw (Errors.INEXISTE);

        // Preenchimento de quantity e isMarketable.
        existe.inventory.quantity = 0;
        existe.inventory.warehouses.forEach(w => existe.inventory.quantity += w.quantity);
        existe.isMarketable = (existe.inventory.quantity === 0) ? false : true;

        return existe;
    }

    deletarProduto(sku) {
        // Verifica existência de sku.
        const existe = this.repository.recuperarPorSku(parseInt(sku));
        if (!existe) throw (Errors.INEXISTE);

        this.repository.deletar(sku);
    }
}

module.exports = ProdutosService;
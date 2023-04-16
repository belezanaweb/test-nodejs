class ProdutosService {
    constructor(repository) {
        this.repository = repository;
    }

    criarProduto(payload) {
        if(!payload.sku || !payload.name) throw ({error: 'Payload invalido.', status: 406});

        const existe = this.repository.recuperarPorSku(payload.sku);

        if (existe)  throw ({ error: 'Produto já existe.', status: 406 });

        return this.repository.criar(payload);
    }

    editarProduto(skuParam, payload) {
        const sku = parseInt(skuParam);
        const existe = this.repository.recuperarPorSku(sku);

        if (!existe) {
            throw ({
                error: 'Produto não existe.',
                status: 406
            })
        }

        return this.repository.editar(sku, payload);
    }

    recuperarProduto(skuParam) {
        const sku = parseInt(skuParam);
        const existe = this.repository.recuperarPorSku(sku);

        if (!existe) {
            throw ({
                error: 'Produto não encontrado.',
                status: 406
            })
        }

        let quantity = 0;

        existe.inventory.warehouses.forEach(w => quantity += w.quantity);
        existe.inventory.quantity = quantity;
        existe.isMarketable = (quantity === 0) ? false : true;

        return existe;
    }

    deletarProduto(skuParam) {
        const sku = parseInt(skuParam);
        const existe = this.repository.recuperarPorSku(sku);

        if (!existe) {
            throw ({
                error: 'Produto não encontrado.',
                status: 406
            })
        }

        this.repository.deletar(sku);
    }
}

module.exports = ProdutosService;
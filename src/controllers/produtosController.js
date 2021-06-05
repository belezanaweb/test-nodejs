const db = require("../database/index.js");

exports.get = async (req, res) => {
    const produto = await db.getBySKU(req.params.id);
    if (produto) {
        produto.inventory.quantity = produto.inventory.warehouses.reduce((a, b) => a + b.quantity, 0);
        produto.isMarketable = produto.inventory.quantity > 0;
        res.status(200).send(produto);
    } else {
        res.status(404).send({ message: "SKU não encontrado!" });
    }
};

exports.post = async (req, res) => {
    const isCreated = await db.create(req.body);
    if (isCreated.status) {
        res.status(201).send({ message: isCreated.message });
    } else {
        res.status(404).send({ message: isCreated.message });
    }
};

exports.put = async (req, res) => {
    const isUpdated = await db.updateBySKU(req.params.id, req.body);
    if (isUpdated) {
        res.status(200).send({ message: 'Produto Atualizado' });
    } else {
        res.status(404).send({ message: 'Erro ao atualizar Produto' });
    }
};

exports.delete = async (req, res) => {
    const isDeleted = await db.deleteBySKU(req.params.id);
    if (isDeleted) {
        res.status(200).send({ message: "Produto Removido" });
    } else {
        res.status(404).send({ message: "Produto não Removido" });
    }
};

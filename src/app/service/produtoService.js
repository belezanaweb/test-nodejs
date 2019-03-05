let produtos = new Map();

const buscar = (sku) => {
  let produto = produtos.get(sku);

  if (produto) {
    let quantity;
    if (produto.inventory.warehouses && produto.inventory.warehouses.length > 0) {
      quantity = produto.inventory.warehouses
        .reduce((a, b) => ({quantity: a.quantity + b.quantity})).quantity;
    } else {
      quantity = 0;
    }
    produto.inventory.quantity = quantity;
    produto.isMarketable = quantity > 0;
    return produto;
  }

  return null;
};

const criar = (produto) => {
  const sku = Number(produto.sku);
  const produtoExiste = produtos.has(sku);
  if (produtoExiste) {
    throw new Error(`Produto com sku ${sku} já existe.`);
  } else {
    produtos.set(produto.sku, produto);
  }
};

const deletar = (sku) => {
  return produtos.delete(sku);
};

const editar = (novoProduto) => {
  const sku = Number(novoProduto.sku);
  const produtoExiste = produtos.has(sku);
  if (produtoExiste) {
    let produto = {...novoProduto};
    produtos.set(sku, produto);
  } else {
    throw new Error(`Produto com sku ${sku} não existe.`);
  }
};

module.exports = {
  buscar: buscar,
  criar: criar,
  deletar: deletar,
  editar: editar
};

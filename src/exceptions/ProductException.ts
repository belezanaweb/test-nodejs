export default class ProductException extends Error{
    static E00 = 'Erro ao cadastrar produto';
    static E01 = 'Erro ao buscar produto';
    static E02 = 'Erro ao atualizar produto';
    static E03 = 'Erro ao deletar produto';
    static E04 = 'Erro ao cadastrar o produto, sku já existente, tente novamente.';
    static E05 = 'Erro ao calcular a quantidade do inventório.';
    static E06 = 'SKU não informado.';
    static E07 = 'Produto não encontrado.';
    static E08 = 'Erro ao calcular campo marketable.'
}
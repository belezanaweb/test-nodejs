export enum sumary {
	DOC = 'Api desenvolvida para executar um CRUD de sku, sem persistência em banco, apenas com mapeamento lógico.',
    CREATE = 'Cria o sku conforme payload recebido, executando devidas validações',
    LIST = 'Lista o sku buscado, trazendo não só as informações do sku, como também a soma de produtos dos armazéns, assim como um status de habilitado para a venda quando o estoque for maior que 0',
    UPDATE = 'Atualiza todo o sku baseado nas informações do payload enviado',
    DELETE = 'Remove o sku baseado no skuId enviado'
}
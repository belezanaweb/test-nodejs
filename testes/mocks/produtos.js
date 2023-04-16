const productMock = {
    SKU_SUCESSO: 43264,
    SKU_SEMESTOQUE: 43265,
    SKU_INEXISTE: 99999,
    PRODUTO_CRIAR_SUCESSO: {
        "sku": 43264,
        "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        "inventory": {
            "warehouses": [
                {
                    "locality": "SP",
                    "quantity": 12,
                    "type": "ECOMMERCE"
                },
                {
                    "locality": "MOEMA",
                    "quantity": 3,
                    "type": "PHYSICAL_STORE"
                }
            ]
        }
    },
    PRODUTO_CRIAR_INVALIDO: {
        "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        "inventory": {
            "warehouses": [
                {
                    "locality": "SP",
                    "quantity": 12,
                    "type": "ECOMMERCE"
                },
                {
                    "locality": "MOEMA",
                    "quantity": 3,
                    "type": "PHYSICAL_STORE"
                }
            ]
        }
    },
    PRODUTO_SEMESTOQUE: {
        "sku": 43265,
        "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 100g",
        "inventory": {
            "warehouses": [
                {
                    "locality": "SP",
                    "quantity": 0,
                    "type": "ECOMMERCE"
                },
                {
                    "locality": "MOEMA",
                    "quantity": 0,
                    "type": "PHYSICAL_STORE"
                }
            ]
        }
    },
    PRODUTO_EDITAR_SUCESSO: {
        "sku": 43264,
        "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 250g",
        "inventory": {
            "warehouses": [
                {
                    "locality": "SP",
                    "quantity": 12,
                    "type": "ECOMMERCE"
                },
                {
                    "locality": "MOEMA",
                    "quantity": 5,
                    "type": "PHYSICAL_STORE"
                }
            ]
        }
    },
    PRODUTO_RECUPERAR_SUCESSO: {
        "sku": 43264,
        "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 250g",
        "inventory": {
            "quantity": 17,
            "warehouses": [
                {
                    "locality": "SP",
                    "quantity": 12,
                    "type": "ECOMMERCE"
                },
                {
                    "locality": "MOEMA",
                    "quantity": 5,
                    "type": "PHYSICAL_STORE"
                }
            ]
        },
        "isMarketable": true,
    },
    PRODUTO_RECUPERAR_SEMESTOQUE: {
        "sku": 43265,
        "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 100g",
        "inventory": {
            "quantity": 0,
            "warehouses": [
                {
                    "locality": "SP",
                    "quantity": 0,
                    "type": "ECOMMERCE"
                },
                {
                    "locality": "MOEMA",
                    "quantity": 0,
                    "type": "PHYSICAL_STORE"
                }
            ]
        },
        "isMarketable": false,
    },
}

module.exports = productMock;
const products = [
    {
        "sku": 43264,
        "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        "inventory": {
            "quantity": 15,
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
        },
        "isMarketable": true
    },
    {
        "sku": 1234,
        "name": "L'Oréal  1234 Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        "inventory": {
            "quantity": 15,
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
        "isMarketable": true
    }
];

module.exports = products;

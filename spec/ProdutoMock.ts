const productCheckFlagMarketableTrue = {
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
    }
} as any;


const productCheckFlagMarketableFalse = {
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
} as any;


const calculateInventoryQuantity =  [
        {
            "locality": "SP",
            "quantity": 20,
            "type": "ECOMMERCE"
        },
        {
            "locality": "MOEMA",
            "quantity": 30,
            "type": "PHYSICAL_STORE"
        }
] as any;

const calculateInventoryQuantityEmpty =  [] as any;
const productUndefined = undefined;
export  {
    productCheckFlagMarketableTrue,
    productCheckFlagMarketableFalse,
    calculateInventoryQuantity,
    calculateInventoryQuantityEmpty,
    productUndefined 
}
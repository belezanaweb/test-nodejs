export class ProductMockFactory {

    public static createProductRequest(){
        return {
            sku: 123,
            name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
            inventory: {
                warehouses: [
                    {
                        locality: "SP",
                        quantity: 12,
                        type: "ECOMMERCE"
                    },
                    {
                        locality: "MOEMA",
                        quantity: 3,
                        type: "PHYSICAL_STORE"
                    }
                ]
            }
        }
    }

    public static createInvalidProductRequest(){
        return {
            sku: 'aaa',
            name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
            inventory: {
                warehouses: [
                    {
                        locality: "SP",
                        quantity: '12a',
                        type: "ECOMMERCE"
                    },
                    {
                        locality: "MOEMA",
                        quantity: 3,
                        type: "INVALID_TYPE"
                    }
                ]
            }
        }
    }

}
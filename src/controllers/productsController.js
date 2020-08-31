let products = [
    {
        "sku": 54321,
        "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        "inventory": {
            "warehouses": [
                {
                    "locality": "SP",
                    "quantity": 12,
                    "type": "ECOMMERCE"
                }
            ]
        }
    },
    {
        "sku": 12345,
        "name": "Lipidium - Máscara de Reconstrução 100g",
        "inventory": {
            "warehouses": [
                {
                    "locality": "SP",
                    "quantity": 0,
                    "type": "ECOMMERCE"
                }
            ]
        }
    }
];

const createProduct = (request, response) => {
    try{
        const { sku, name, inventory } = request.body;

        if(sku, name, inventory === "" || undefined){
            response.status(400).send({ message: "Enter a valid product" });
        }else{
            const p = products.find((v) => v.sku == sku);

            if(p){            
                response.status(400).send({message: "It is not possible to register a product already registered"});
            }else{
                const product = {
                    sku,
                    name,
                    inventory
                };
        
                products.push(product);  
                response.status(200).send({ message: "Product successfully registered"});   
            };            
        };        
    }catch(err){
        response.status(400).send({ message: err.message });        
    };
};


module.exports = {
    createProduct
};
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

const getProductBySku = (request, response) => {
    try{ 
        let isMarketable =  false;
        let totalQuantity = 0;
        
        let product = products.find((v) => v.sku == parseInt(request.params.sku));  
        
        if(product){
            if(product.inventory.warehouses.quantity != 0){
            
                let sum = product.inventory.warehouses.reduce(function( prevVal, elem ) {
                    return prevVal + elem.quantity;
                }, 0 );
    
                totalQuantity = sum;
                if(sum != 0){
                    isMarketable = true; 
                }else{
                    isMarketable = false;
                };            
                
                const result = [];            
                result.push({product, totalQuantity, isMarketable});
                            
                return(response.status(200).send(result));
            };    
        }else{
            response.status(400).send({ message: "Unregistered product"})
        };              
    }catch(err){
        response.status(400).send({ message: err.message });        
    };
};

const updateProduct = async (request, response) => {
    try{     
        const {
            sku, name, inventory
        } = request.body;

        if(sku, name, inventory === "" || undefined){
            response.status(400).send({ message: "Enter a valid product" });
        }else{
            const p = products.find((v) => v.sku == parseInt(request.params.sku));

            if(p){
                p.sku = sku;
                p.name = name;
                p.inventory = inventory;         
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                response.status(200).send({message: "Product successfuly updated"});
            }else{
                response.status(400).send({ message: "Unregistered product" }); 
            }; 
        };             
    }catch(err){
        response.status(400).send({ message: err.message });        
    };
};




module.exports = {
    createProduct,
    getProductBySku,
    updateProduct
};
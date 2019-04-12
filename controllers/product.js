let products = [{
    "sku": 43264,
    "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
    "inventory": {
        "quantity": 15,
        "warehouses": [{
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
}]

function get(req, res, next) {

    try {

        sku = parseInt(req.params.sku);
        const retorno = products.find( obj => obj.sku === sku);

        if (req.params.sku) {
            if (retorno) {
                updateQtd();
                res.status(200).json(retorno);
            } else {
                res.status(404).end('sku não encontrado');
            }
        } else {
            res.status(400).end('sku não informado');
        }

    } catch (err) {
        next(err);
    }
}


function post(req, res, next) {

    try {

         const new_product = req.body;

         if (products.find(obj => obj.sku === new_product.sku)) {
             res.status(404).end('produto já cadastrado');

         } else {
             products.push(new_product);
             updateQtd();
             res.status(201).json(products);
         }

    } catch (err){
        next(err)
    }    
}

function put(req, res, next) {

    let bprd = false;

    try {

        const new_product = req.body;

        for (var prd in products) {

            if (products[prd].sku == new_product.sku) {
                products[prd].name = new_product.name;
                products[prd].inventory = new_product.inventory;
                bprd = true;
            }

        }

        updateQtd();

        if (bprd) {
            res.status(200).json(products);
        } else {
            res.status(404).end();
        }       


    }catch (err){
        next (err)
    }
    
}

function del(req, res, next) {

    let bprd = false;

    try {

        sku = parseInt(req.params.sku, 10);

        for (var prd in products) {
            if (products[prd].sku == sku) {
                products.splice(prd,1);
                bprd = true;
            }
        }

        if (bprd) {
            res.status(200).json(products);
        } else {
            res.status(404).end();
        }        

    } catch (err) {
        next (err)
    }
    
}

function updateQtd(){

    for (var prd in products) {

        let total = 0;

        for (var inv in products[prd].inventory.warehouses) {
            total += products[prd].inventory.warehouses[inv].quantity
        }

        products[prd].inventory.quantity = total

        if (total > 0) {
            products[prd].isMarketable = true;
        } else {
            products[prd].isMarketable = false;
        }

    }
}

module.exports.put = put;
module.exports.post = post;
module.exports.get = get;
module.exports.delete = del;
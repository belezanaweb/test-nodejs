module.exports = app => {
    const productsJson = app.data.products;
    const controller = {};
    //GET - list all products
    controller.listAllProducts = (req, res) => res.status(200).json(productsJson);
    
    //POST - save
    controller.saveProduct = (req,res) =>{
      try{
        const index = productsJson.products.findIndex(product => product.sku == req.body.sku);
        if(index === -1){
            productsJson.products.push({
            sku: req.body.sku,
            name: req.body.name,
            inventory: req.body.inventory
          });
          return res.status(201).json({messages: 'Produto incluido'});
        }
        //res.status(202);
        throw new Error(`produto existente, sku: ${req.body.sku}`);
      }catch(err) {
        throw err;
      }
    }

    //PUT - alter product
    controller.alterProduct = (req,res) =>{
      try{
       const index = productsJson.products.findIndex(product => product.sku == req.body.sku);
       if(index === -1){
          return res.status(404).json({message:'não encontrado'});
        }
        const newProduct = {
          sku: req.body.sku,
          name: req.body.name,
          inventory: req.body.inventory
        };
        
        const deleted = productsJson.products.splice(index,1,newProduct);
        return res.status(200).json({message: "produto alterado"});
      }catch(err) {
        throw new Error("Erro");
      }
    }

    //GET - list product by sku
    controller.listProduct = (req,res) =>{
      try{
        const product = productsJson.products.find(product => product.sku == req.params.sku);
        if(product === undefined){
          return res.status(404).json({message: 'não encontrado'});
        }
        //calcula qtd total do produto
        let total = product.inventory.warehouses.reduce((sum,item)=> {return sum + item.quantity},0);
    
        product.inventory.quantity = total;
        product.isMarketable = (total >> 0? true:false);
      
        res.status(200).json(product);
      }catch(err) {
        throw new Error("Erro");
      }
    }

    //DELETE exclude product
    controller.excludeProduct = (req, res) =>{
      try{
          const index = productsJson.products.findIndex(product => product.sku == req.params.sku);
          if(index === -1){
            return res.status(404).json({message: 'não encontrado'});
          }
          //console.log(productsJson.products);
          const deleted = productsJson.products.splice(index,1);
          return res.status(200).json({message: "excluido"});
      }catch(err) {
        throw new Error("Erro");
      }
    }
    return controller;
  }

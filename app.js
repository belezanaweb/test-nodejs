const express             = require('express');
const app                 = express();
const bodyParser          = require('body-parser');
let memory                = require('./memory.json');

const port = process.env.PORT | 3000;

app.use(bodyParser.json());

// Show
app.get('/:sku', (req, res) => {
  try{
    const sku = parseInt(req.params.sku);

    // Resgata Sku correto
    const product = memory.filter((prod) => prod.sku === sku)[0];
    // Se não for encontrado
    if(!product) throw new Error('Product not found');

    // Calcula quantidades
    const amount = product.inventory.warehouses.reduce((accumulator, current) => (
      accumulator + current.quantity
    ), 0);
    product.isMarketable = (amount > 0) ? true : false;
    product.inventory.quantity = amount;
    return res.status(200).send(product);
    
  }catch(error){
    return res.status(400).send('Produto não encontrado');
  }

});

// Create
app.post('/:sku', (req, res) => {
  try{
    const sku = parseInt(req.params.sku);
    // Checa se é único
    const isUnique = memory.reduce( (accumulator, current) => {
      return accumulator && current.sku !== sku
    }, true);
    if(!isUnique) throw new Error('Sku já existente');

    // Não possibilitando dados extras
    let save = {
      "sku": sku,
      "name": req.body.name,
      "inventory":{
        "warehouses": [
          ...req.body.inventory.warehouses
        ]
      }
    }

    // Salvando na memória
    memory.push(save);
    res.status(200).send('criado');
    
  }catch(error){
    return res.status(400).send('Sku já registrado');
  }
});

// Update
app.put('/:sku', (req, res) => {
  try{
    const sku = parseInt(req.params.sku);
    let productFound = false;
    // Dados para salvar
    const updatedProduct = {
      "sku": sku,
      "name": req.body.name,
      "inventory":{
        "warehouses": [
          ...req.body.inventory.warehouses
        ]
      }
    }
    
    // Se achar grava index
    const updatedMemory = memory.map((product, index) => {
      if(product.sku === sku){
        productFound = true;
        return updatedProduct;
      }
      return {...product};
    });
    
    // Não encontrar gera resposta de erro
    if(!productFound) throw new Error('Não encontrado');

    // Atualiza
    memory = updatedMemory;
    res.status(201).send('Atualizado');

  }catch(error){
    return res.status(400).send('Não encontrado');
  }
});

// Destroy
app.delete('/:sku', (req, res) => {
  try{
    const sku = parseInt(req.params.sku);
    let productFound = false;
    // Identifica e remove
    const removedElementMemory = memory.filter(product => {
      if(product.sku === sku){
        productFound = true;
        return false; // Não retorna elemento, deve ser deletado
      }
      return true; // Retorna elemento
    });
    
    if(!productFound) throw new Error('Não encontrado');

    // Atualiza
    memory = removedElementMemory;
    return res.status(200).send('Apagado com sucesso');
    
  }catch(error){
    return res.status(400).send('Não encontrado');
  }  
});

app.listen(port, () => {
  console.log("Iniciado...")
})
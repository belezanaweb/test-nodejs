const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    const checkSku = await Product.findOne({ sku: req.body.sku });
    if (checkSku) return res.status(422).json({ error: "Sku code is already in use" });

    const { sku, name, quantity, locality, type } = req.body;
    const warehouses = [{ locality, quantity, type }];

    const product = await Product.create({ sku, name, warehouses });
    res.status(200).json(product);
}

exports.getProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
}

exports.getProductBySku = async (req, res) => {
    let product = await Product
        .findOne({ sku: req.params.sku })
        .select('sku name warehouses quantity');

    if(!product) return res.status(404).json({error: "Product not found"});

    const quantity = product.warehouses.reduce((acc, cv) => acc + cv.quantity, 0);

    if (quantity > 0) return res.status(200).json({
        sku: product.sku,
        name: product.name, 
        quantity: quantity,
        inventory: { warehouses: product.warehouses }, 
        isMarketable: true 
    });

    else return res.status(200).json({
        sku: product.sku,
        name: product.name, 
        quantity: quantity,
        inventory: { warehouses: product.warehouses },
        isMarketable: false 
    })
}

exports.updateProduct = async (req, res) => {
    let { name, quantity, locality, type } = req.body;
    const newProduct = {
        name,
        warehouses: [{ locality, quantity, type }]
    }

    await Product.findOneAndUpdate(
        { sku: req.params.sku },
        { $set: newProduct },
        {upsert: true, new: true , safe: true },
        (err, model) => {
            if(err) return res.json(err);
            res.status(200).json(model)
        }
    );

}

exports.deleteProduct = async (req, res) => {
    const deletedProduct = await Product.findOneAndDelete({sku: req.params.sku});
    res.status(200).json(deletedProduct);
}

exports.addNewWarehouse = async (req, res) => {

    let product = await Product.findOne({ sku: req.params.sku });
    if(!product) return res.status(404).json({msg: 'Product not found.'});

    let { quantity, locality, type } = req.body;
    let newWarehouse = {
        locality, 
        quantity, 
        type
    };

    product.warehouses.unshift(newWarehouse);
    product.save();
    res.status(200).json(product);
}



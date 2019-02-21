const { 
    createProduct, 
    getProducts, 
    getProductBySku,
    updateProduct,
    deleteProduct,
    addNewWarehouse,
} = require('../controllers/ProductController');

module.exports = app => {
    app.post('/api/product', createProduct);
    app.get('/api/product', getProducts);
    app.get('/api/product/:sku', getProductBySku);
    app.put('/api/product/:sku', updateProduct);
    app.delete('/api/product/:sku', deleteProduct);
    app.post('/api/product/warehouse/:sku', addNewWarehouse);
}
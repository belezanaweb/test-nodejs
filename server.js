const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const HealthCheck = require('./action/healthcheck');
const Product = require('./action/product');

/*Api*/

app.get('/health-check', async (req, res) => {
  res.json(await HealthCheck.do());
});

app.get('/product/:sku', async (req, res) => {
  res.json(await Product.getProductBySky(req.params.sku));
});

app.delete('/product/:sku', async (req, res) => {
  res.json(await Product.deleteProductBySky(req.params.sku));
});

app.post('/product', async (req, res) => {
  try {
    console.log(req.body);
    res.json(await Product.createProduct(req.body));
  } catch (error) {
    res.status(500).send({
      msgType: 'error',
      msg: 'Created product failed',
      error: error.message,
    });
  }
});

app.put('/product', async (req, res) => {
  try {
    console.log(req.body);
    res.json(await Product.updateProduct(req.body));
  } catch (error) {
    res.status(500).send({
      msgType: 'error',
      msg: 'Updated product failed',
      error: error.message,
    });
  }
});

/*Server Start*/
app.listen(3000, () => {
  console.log(`I'm listenting at http://localhost: 3000...`);
});

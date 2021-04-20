const express = require('express');

const resp = require('./utils/response');
const ValidateRequest = require('./middleware/validate-request');
const ProductRouter = require('./routes/product-routes');

const app = express();

app.use(express.json());

app.use('*', ValidateRequest);
app.use('/api/v1/products', ProductRouter);

app.get('*', (req, res) => resp.sendError(res, "", new BadRequest()));

const port = 3000;

app.listen(port, ()=> console.log(`Server is listenning on port ${port}...`));

module.exports = app;
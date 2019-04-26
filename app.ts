import express = require('express');
import bodyParser = require('body-parser')

import { 
    get as productGet,
    post as productPost,
    put as productPut,
    _delete as productDelete
} from "./src/request/ProductRequest";

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/product/:sku', productGet);
app.post('/product', productPost);
app.put('/product', productPut);
app.delete('/product/:sku', productDelete);

app.listen(port, () => console.log(`Running on port ${port}!`))
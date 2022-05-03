import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import routes from './routes'
import ProductRoutes from './routes/product'

const allowedOrigins = process.env.NODE_ENV === 'dev' ? '*' : ['https://belezanaweb.com.br'];
const app =  express()

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin: function(origin, callback){
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if(!origin || allowedOrigins === '*') return callback(null, '*');
      if(allowedOrigins.some(or => origin.includes(or))){
        return callback(null, '*');

      } else if(process.env.ENV === 'dev'){
        return callback(null, '*');
      }else {
        var msg = 'The CORS policy for this site does not allow access from the specified Origin. ;(';
        return callback(new Error(msg), false);
      }

    }
  }))


app.use('/', routes);
app.use('/product', ProductRoutes);

export default app;

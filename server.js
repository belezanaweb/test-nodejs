const app = require('./config/express')();
     

app.listen(3001, () => {
    console.log('running port: 3001');
});

app.use((err,req,res,next) => {
    console.log(err);
    res.status(500||err.status).json({messages: err.message});
});
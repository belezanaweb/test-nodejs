const app =require('./app')

app.listen(3000, (err) => {
    if (err){
        console.error('❌ Unable to connect the server: ', err)
    }
    console.log('🌍 Server listening on port ', 3000);
});
const app = require('./src/app.js');

app.listen(3000, (err) => {
  if(err) {
    return console.log('erro')
  }

  console.log('iniciou em porta 3000')
})

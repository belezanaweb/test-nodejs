const app = require('./server')
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
});

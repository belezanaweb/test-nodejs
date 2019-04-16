//chama o arquivo de configuracao do projeto, e ja executa ele como uma funcao com os () no final do require
var app = require('./config/express')(); //o ponto na frente do caminho diz que ele vai procurar o arquivo a partir da raiz

// define as rotas, no entanto, como instalasmos o laod express, o carregamento das rotas são feitos no arquivo express.js
// var rotasProdutos = require('./app/routes/produtos')(app);

//chamada quando o servidor esta pronto
app.listen(3000,function(){
    console.log("Servidor rodando")
})


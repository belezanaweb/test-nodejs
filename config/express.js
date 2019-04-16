//imorta a biblioteca express
var express = require('express');

//imorta a biblioteca do expressload (carrega as rotas automaticamente)
var load = require('express-load');

//carega o body parse que trata o recebimento via post
var bodyParser = require('body-parser');

//module eh a variavel que referencia o objeto em si, exports que a funcao que vc quer que retorne, 
module.exports = function(){

    var app = express();

    //define uma string chamada 'view engine' e o nome da engine instalada 'EJS' (embeed javascript)
    app.set('view engine','ejs');

    //diz aonde ficam as views, caso não especifique, ele procura as views na pasta views que deve se encontrar na raiz do projeto
    app.set('views','./app/views');


    app.use(express.static('./app/public'));
    app.use(express.static('./'));
    
    //recebe funções que serão aplicadas no request na ordem que definimos abaixo
    app.use(bodyParser.urlencoded({extended: true})); 

    //Caso não encontre um formulário enviado via form, procura um enviado via json
    app.use(bodyParser.json());

    //Carrega as funções de JWT e do .ENV
    require("dotenv-safe").load();
    jwt = require('jsonwebtoken');
    require('../app/routes/auth')

    load('routes',{cwd: 'app'}) //para não procurar no sistema inteiro o 'cwd' indica dentro de qual pasta ele deve procurar
        .then('infra') //significa que depois de carregar as rotas "Então" carregue tudo dentro de infra
        .into(app);

    return app;
}

module.exports = function(app){
    var fs = require('fs'); //variavel global do arquivo para acessar os métodos de leitura e gravação de arquivo
    
    app.get('/',function(req,res){ 
        res.render("index",{msg:''});   
    })

    /*
    |--------------------------------------------------------------------------
    | Controller de Token
    |--------------------------------------------------------------------------
    | Esta rota é responsável por criar um token para ser utilizado nas requisições. No atributo 'expiresIn' é possível determinar quanto tempo vai durar o token antes
    | que ele expire. Como este sistema é de caráter avaliativo, nenhuma requisição está usando este token.
    | 
    | Retorno:
    | token => Retorna o número do token para ser usado nas requisições, seja através do header de uma requisição ou através de input hidden
    */
    app.get('/token',function(req,res){
        const id = 1; //esse id é usado para gerar o token, pode ser qualquer número, o ideal é utilizar o id do usuário do banco de dados
        var token = jwt.sign({ id },process.env.SECRET, {
            expiresIn: 600 //10 min para expirar o token ou 600 segundos
        });

        res.status(200).send(token);
    })



    /*
    |--------------------------------------------------------------------------
    | Listagem de produtos
    |--------------------------------------------------------------------------
    | Esta rota é responsável apenas por trazer a listagem de produtos salvas no arquivo de dados
    | 
    | Retorno:
    | dados => Retorna todos os dados para a listagem
    | msg => Quando um determinado produto for atualizado exibe uma mensagem de agradecimento
    |
    */
    app.get('/produtos',function(req,res){
        var content = fs.readFileSync("./dados.json",'utf8'); //Lê o arquivo de dados e espera o encode utf8
        
        var json = '';
        if(content != ''){
            json = JSON.parse(content); //transforma os dados em um objeto para devolver na view                       
        }

        res.format({
            html: function(){
                res.render("produtos/lista",{dados:json, msg:''});   
            },
            json: function(){
                res.status(200).send({ success: true, dados:json});
            }
        })
    })



    /*
    |--------------------------------------------------------------------------
    | Deletar produto
    |--------------------------------------------------------------------------
    | Esta rota é responsável por deletar o produto ao enviar o sku via POST
    | 
    |
    */
    app.post('/produto/deletar',function(req,res){
        var id = req.body.id //recebe o id do form

        var content = fs.readFileSync("./dados.json",'utf8'); //Lê o arquivo de dados 
        json = JSON.parse(content); //transforma os dados em um objeto para devolver na view                       

        for (let i = 0; i < json.length; i++) { //vascula o objeto e procura pelo sku enviado na requisição
            if(json[i].sku == id){
                json.splice(i, 1) //ao encontrar o id ele apaga do objeto
            }
        }

        var write = JSON.stringify(json); //transforma o objeto em string para gravar no arquivo novamente
        
        var content = fs.writeFileSync("./dados.json",write); //grava o arquivo
        
        res.status(200).send({ success: true, message: 'Excluido com sucesso' });
        return
    })



    /*
    |--------------------------------------------------------------------------
    | Tela de Cadastro de produtos
    |--------------------------------------------------------------------------
    | Esta rota é responsável por renderizar apenas a tela de cadastro do produto
    | 
    | Retorno:
    | msg => Quando um produto for cadastrado corretamente ele exibe uma mensagem nessa tela de sucesso
    |
    */
    app.get('/produtos/inserir',function(req,res){
        res.render("produtos/inserir",{msg:'',success:''});   
    })
    


    /*
    |--------------------------------------------------------------------------
    | Controller de Cadastro de produtos
    |--------------------------------------------------------------------------
    | Esta rota é responsável por realizar o cadastro do produto em um arquivo JSON na raiz do projeto
    | 
    | Retorno:
    | msg => Quando um produto for cadastrado corretamente ele exibe uma mensagem nessa tela de sucesso
    |
    */
    app.post('/produtos',function(req,res){
        var form = req.body; //Recebe os dados do formulário
        var json = [];

        var content = fs.readFileSync("./dados.json",'utf8'); //le e grava o conteúdo do arquivo
    
        var item = 0; //cria uma váriavel item para que possamos saber em qual indíce vamos gravamos o nosso novo produto

        if(content != ''){ //verifica se existe algum produto já cadastrado, caso exista, é preciso verificar se o produto que estamos tentando gravar já existe no nosso objeto
            json = JSON.parse(content); //transforma esse arquivo em objeto 
            
            for (let i = 0; i < json.length; i++) { //vascula o objeto para verificar se já existe algum sku cadastrado
                item = item + 1; //incremento feito para saber em qual indíce guardar o nosso novo produto
                if(json[i].sku == form.sku){ //se já existir retorna erro 500
                    res.format({
                        html: function(){
                            res.render("produtos/inserir",{msg:'Já existe um produto com esse SDK',success:false});   
                        },
                        json: function(){
                            res.status(500).send({ success: false, message: 'Já existe um produto com esse nome' });
                        }
                    })
                    return false
                }
            }
        }

        var estoque = 0; 
        for (let indice = 0; indice < form.inventory.warehouses.length; indice++) { //vasculhar a quantidade de itens por loja e adicionar na váriavel estoque
            estoque = estoque + parseInt(form.inventory.warehouses[indice].quantity); 
        }

        var isMarketable = (estoque > 0) ? true : false; //verificar se existe quantidade o suficiente para ser vendido
        form.inventory.quantity = estoque;
        form.isMarketable = isMarketable;
        delete form.token; //apaga o token (como o sistema é de caráter avaliativo o token não se faz necessário em nenhuma requisição)

        json[item] = form //adiciona os items no novo indice
        
        var write = JSON.stringify(json); //salva em formato string
        
        var content = fs.writeFileSync("./dados.json",write); //grava o arquivo

        res.format({
            html: function(){
                res.render("produtos/inserir",{msg:'Produto cadastrado com sucesso',success:true});   
            },
            json: function(){
                res.status(200).send({ success: true, message: 'Produto cadastrado com sucesso' });;
            }
        })
    })



    /*
    |--------------------------------------------------------------------------
    | Controller de Busca de um produto
    |--------------------------------------------------------------------------
    | Esta rota é responsável por realizar a busca de um produto específico
    | 
    | Retorno:
    | dados => Retorna todos os dados do produto
    | lojas => Retorna todas as lojas do produto
    */
    app.get('/produtos/:id?',function(req,res){
        var id = req.params.id //Pega o ID enviado por parâmetro

        var content = fs.readFileSync("./dados.json"); //abre o arquivo JSON

        json = JSON.parse(content); //Transforma o arquivo em objeto
        
        for (let i = 0; i < json.length; i++) { //Procura pelo ID no objeto do arquivo
            if(json[i].sku == id){
                var data = json[i];
            }
        }
        var lojas = (typeof data.inventory.warehouses !== 'undefined') ? data.inventory.warehouses : ''; //verifica se existem lojas cadastradas para aquele produto
      
        res.render('produtos/editar',{dados:data,lojas:lojas});
    })



    /*
    |--------------------------------------------------------------------------
    | Controller de Edição de um produto
    |--------------------------------------------------------------------------
    | Esta rota é responsável por editar um produto específico e salvar novamente as informações no arquivo JSON que simula o banco de dados
    | 
    | Retorno:
    | dados => Se a edição for feita corretamente ele redireciona o usuário para a tela de listagem de produtos e para isso ele precisa do JSON atualizado 
    | msg => Quando um determinado produto for atualizado exibe uma mensagem de sucesso
    */
    app.post('/produtos/editar',function(req,res){
        var form = req.body; //reserva os dados enviado pelo form
        
        var content = fs.readFileSync("./dados.json"); //abre o arquivo

        json = JSON.parse(content); //transforma os dados em um objeto
        
        for (var i = 0; i < json.length; i++) { //procura qual o produto será editado através do ID enviado pelo form
            if(json[i].sku == req.body.sku){
                var ref = i;
            }
        }

        var estoque = 0; //reserva variável total de estoque para adicionar ao atributo quantity
        var inventario = form.inventory; //guarda os dados da loja
        if(typeof inventario !== 'undefined'){ //verifica se existe alguma loja cadastrada
            for (let indice = 0; indice < form.inventory.warehouses.length; indice++) { //vascula todos os produtos e guarda a quantidade na variável estoque
                estoque = estoque + parseInt(form.inventory.warehouses[indice].quantity);
            }
            json[ref].inventory = inventario; //adiciona os dados da loja no atributo inventory
        }else{
            json[ref].inventory = {}; //caso não exista nenhuma loja vinculado a este produto ele atribui um objeto vazio
        }

        delete form.token; //apaga o token (como o sistema é de caráter avaliativo o token não se faz necessário em nenhuma requisição)
        var isMarketable = (estoque > 0) ? true : false; //verifica se existe estoque o suficiente para que o produto seja vendido
    
        json[ref].inventory.quantity = estoque; 
        json[ref].isMarketable = isMarketable;
        json[ref].name = form.name;

        var write = JSON.stringify(json); //transforma os dados em string para guardar eles no arquivo
        
        var content = fs.writeFileSync("./dados.json",write); //grava o arquivo com os dados atualizados

        res.format({
            html: function(){
                res.render("produtos/lista",{msg:'Produto salvo com sucesso',dados: json});   
            },
            json: function(){
                res.status(200).send({ success: true, message: 'Produto salvo com sucesso' });;
            }
        })
    })
}
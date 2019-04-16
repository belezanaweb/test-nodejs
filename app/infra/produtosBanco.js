function ProdutosBanco(connection){
	this.connection = connection 
}

ProdutosBanco.prototype.lista =  function(callback){
	this.connection.query('select * from produtos',callback);
}	

module.exports = function(){
	return ProdutosBanco;
}
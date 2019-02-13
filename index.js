const express = require ('express');
const app = express();

app.use(express.json());

let products = [];

app.get('/', (request, response) => {
	response.send('Olá, Beleza na Web! Me chamo Luiz Filho!');
});

app.get('/products', (request, response) => {

	if ( products.length === 0 ) {
		response.status(404).send('Não há produtos cadastrados.');
	} else {
		resp = products;

		resp.forEach( (item) => {
			let quantity = 0;
			item.inventory.warehouses.forEach( (i) => {
				quantity = quantity + i.quantity;
			});
			item.inventory.quantity = quantity;
			item.isMarketable = (quantity) ? true : false;
		});
		response.send( resp );
	}

});

app.get('/products/:sku', (request, response) => {

	let product = products.find( item => item.sku === parseInt( request.params.sku ));

	if ( !product ) {
		response.status(404).send('Produto não encontrado.');
		return;
	}

	let resp = product;
	let quantity = 0;

	resp.inventory.warehouses.forEach( (item) => {
		quantity = quantity + item.quantity;
	});
	resp.inventory.quantity = quantity;
	resp.isMarketable = (quantity) ? true : false;
	response.status(200).send( resp );
});


app.post('/products', (request, response) => {
	
	let product = products.find( p => p.sku === parseInt( request.body.sku ));

	if( !product ) {
		product = {
			sku: request.body.sku,
		    name: request.body.name,
		    inventory: {
		        warehouses: request.body.inventory.warehouses
		    }
		}

		products.push(product);
		let resp = product;
		let quantity = 0;

		resp.inventory.warehouses.forEach( (item) => {
			quantity = quantity + item.quantity;
		});

		resp.inventory.quantity = quantity;
		resp.isMarketable = (quantity) ? true : false;
		response.status(200).send( resp );
	} else {
		response.status(409).send('Produto já existente.');
	}

});


app.put('/products/:sku', (request, response) => {

	let product = products.find( item => {

		if ( item.sku === parseInt( request.params.sku ) ) {
			item.name = request.body.name;
			item.inventory.warehouses = request.body.inventory.warehouses
			return item;
		}

	});
	
	if( product ) {
		let resp = product;
		let quantity = 0;
		resp.inventory.warehouses.forEach( (item) => {
			quantity = quantity + item.quantity;
		});
		resp.inventory.quantity = quantity;
		resp.isMarketable = (quantity) ? true : false;
		response.status(200).send(resp);
	} else {
		response.status(404).send('Produto não encontrado.');
	}

});

app.delete('/products/:sku', (request, response) => {

	let product = products.find( item => item.sku === parseInt( request.params.sku ));

	if( product ) {
		const index = products.indexOf(product);
		products.splice(index, 1);
		response.status(200).send( product );
	} else {
		response.status(404).send('Produto não encontrado.');
	}

});

app.listen(3000, () => console.log('Servidor rodando na porta 3000!'));
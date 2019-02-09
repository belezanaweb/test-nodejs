const express = require('express');

const {
	Router
} = express;


const route = Router();

route.get('/', (req, res) => {
	res.status(200)
		.json({
			success: true,
			message: 'asdasdasdsadasd'
		});
});

module.exports = route;

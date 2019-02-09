module.exports.getProducts = (req, res) => {
	res.status(200)
		.json({
			success: true,
			result: [
				{
					teste: 2
				}
			]
		});
};

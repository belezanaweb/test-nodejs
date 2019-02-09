const uuidv1 = require('uuid/v1');
const randomColor = require('../random-color');
let participations;

const setInitialParticipations = () => {
	if (!(participations instanceof Array)) {
		participations = [
			{
				id: uuidv1(),
				firstName: 'Marciel',
				lastName: 'Silva',
				participation: 5,
				color: randomColor()
			},
			{
				id: uuidv1(),
				firstName: 'João',
				lastName: 'Souza',
				participation: 5,
				color: randomColor()
			},
			{
				id: uuidv1(),
				firstName: 'João',
				lastName: 'Silva',
				participation: 5,
				color: randomColor()
			},
			{
				id: uuidv1(),
				firstName: 'Maria',
				lastName: 'Silva',
				participation: 4,
				color: randomColor()
			},
			{
				id: uuidv1(),
				firstName: 'Joaquim',
				lastName: 'Pereira',
				participation: 2,
				color: randomColor()
			},
			{
				id: uuidv1(),
				firstName: 'Janaina',
				lastName: 'Ferreira',
				participation: 1,
				color: randomColor()
			},
			{
				id: uuidv1(),
				firstName: 'Janaina',
				lastName: 'Ferreira',
				participation: 2,
				color: randomColor()
			},
			{
				id: uuidv1(),
				firstName: 'Marcos',
				lastName: 'Pereira',
				participation: 2,
				color: randomColor()
			},
			{
				id: uuidv1(),
				firstName: 'Márcio',
				lastName: 'Silva',
				participation: 2,
				color: randomColor()
			},
			{
				id: uuidv1(),
				firstName: 'João',
				lastName: 'Marciel',
				participation: 5,
				color: randomColor()
			}
		];
	}
};

module.exports.getParticipations = () => {
	setInitialParticipations();
	return participations;
};

module.exports.deleteParticipation = (id) => {
	setInitialParticipations();
	participations = participations.filter(item => item.id !== id);
	return participations;
};

module.exports.addParticipation = (model) => {
	setInitialParticipations();
	participations.unshift(model);
	return participations;
};

const { Sequelize } = require('sequelize-typescript')

const options = process.env.TEST ?  { logging: false }: {}
const sequelize = new Sequelize("sqlite::memory:", options);

sequelize.addModels([__dirname + './../**/models/*.ts']);
export default sequelize

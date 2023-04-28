const ModelsLoader = require('../ModelsLoader');
const Sequelize = require('sequelize');

module.exports = ({ config }) => {
  const databaseConfig = config.infra.db;
  if (!databaseConfig) {
    console.error('Database config file log not found, disabling database.');
    return false;
  }
  const sequelize = new Sequelize(databaseConfig);
  sequelize
    .authenticate()
    .then((response) => console.log('Connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));
  return ModelsLoader.load({
    sequelize,
    baseFolder: __dirname
  });
};

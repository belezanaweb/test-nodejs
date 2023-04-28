require('dotenv').config();

const databaseConfig = {
  default: {
    dialect: 'mysql',
    database: process.env.MYSQL_DB_NAME,
    username: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    logging: false,
    host: process.env.MYSQL_DB_SERVERS
  }
};

module.exports = databaseConfig.default;

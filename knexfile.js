// Update with your config settings.
require('dotenv').config({  
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

module.exports = {

  development: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PSWD
    },
    migrations:{
      tableName: 'warehouses_migrations',
      directory: `${__dirname}/src/database/migrations`
    }
  },
  test:{
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PSWD
    },
    migrations:{
      tableName: 'warehouses_migrations',
      directory: `${__dirname}/src/database/migrations`
    }
  }
};

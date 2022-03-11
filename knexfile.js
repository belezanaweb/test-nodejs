module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "10.5.0.1",
      port: "5432",
      database: "teste_boticario",
      user: "postgres",
      password: "postgres",
    },

    migrations: {
      directory: "./src/database/migrations",
      tableName: "teste_boticario",
    },
    useNullAsDefault: true,
  },
};

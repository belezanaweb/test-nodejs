module.exports = {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: "./src/database/data-base.sqlite",
    },
    migrations: {
      directory: "./src/database/migrations",
    },
    useNullAsDefault: true,
  },
};

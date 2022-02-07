module.exports = [
  {
    name: process.env.DB_ENV,
    type: 'sqlite',
    database: process.env.DB_NAME,
    connectionTimeout: 25000,
    requestTimeout: 60000,
    logging: false,
    migrationsTableName: 'MigrationsApiTeste',
    cli: {
      entitiesDir: 'src/infra/adapters/typeorm/entities',
      migrationsDir: 'src/infra/adapters/typeorm/migrations'
    },
    entities: [`${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/adapters/typeorm/entities/**/*.{js,ts}`],
    migrations: [`${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/adapters/typeorm/migrations/*.{js,ts}`]
  }
]

export default {
    client: 'pg',
    connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@postgres:${process.env.DB_PORT}/${process.env.DB_APPLICATION}`,
    searchPath: ['knex', 'public']
}
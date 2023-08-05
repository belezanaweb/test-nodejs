import fastify from 'fastify'

const app = fastify()

app.get('/hello', async () => {
  return 'Hello World!!'
})

app
  .listen({
    port: 3333
  })
  .then(() => {
    console.log('Server is running on port 3333')
  })

const createServer  = require('helpers/create-server')

describe('GET /health', function () {
  let request

  beforeEach(async function () {
    request = await createServer()
  })

  it('Get an OK', async function () {
    let expected = 'true'

    await request.get('/health')
      .expect(200, expected)
  })

  it('Get failed', async function(){

    await request.get('/')
    .expect(404)
  })
})

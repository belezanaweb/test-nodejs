import request from 'supertest'
import app from './../app'

describe('/', () => {
  it('should return html', async () => {
    const res = await request(app)
      .get('/')
    expect(res.body).toEqual('<p>Hello :)</p>')
  })
})

describe('main', () => {
  it('GET /', () => {
    return request.get('/')
      .then(result => {
        assert.equal(200, result.status)
        assert.equal('PONG', result.text)
      })
  })
  it('GET /notfound', () => {
    return request.get('/notfound')
      .then(result => {
        assert.equal(404, result.status)
        assert.deepEqual({ message: 'not found' }, result.body)
      })
  })
})

describe('main', () => {
  it('GET /', () => {
    return request.get('/')
      .then(result => {
        assert.equal(200, result.status)
        assert.equal('PONG', result.text)
      })
  })
})

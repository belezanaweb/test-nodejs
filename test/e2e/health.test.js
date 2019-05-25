describe('health', () => {
  it('GET /health', () => {
    return request.get('/health')
      .then(result => {
        assert.equal(200, result.status)
        assert.equal('OK', result.text)
      })
  })
})

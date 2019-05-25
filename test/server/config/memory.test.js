const debug = require('debug')('wbruno:test:config:memory')
const db = require('../../../server/config/memory')

describe('db memory', () => {
  beforeEach(() => {
    db.collection('products').insert({ sku: 12 })
  })
  afterEach(() => {
    db.collection('products').remove()
  })

  it('#find', () => {
    let found = db.collection('products').find({ sku: 12 })
    debug('found', found)
    assert.ok(found.length)
  })

  it('#find empty query', () => {
    let found = db.collection('products').find()
    assert.ok(found.length)
  })

  it('#findOne', () => {
    let found = db.collection('products').findOne({ sku: 12 })
    debug('found', found)
    assert.ok(found)
  })

  it('#findOne empty query', () => {
    let found = db.collection('products').findOne()
    debug('found', found)
    assert.ok(found)
  })

  it('#insert', () => {
    let inserted = db.collection('products').insert({ sku: 22 })
    debug('inserted', inserted)
    assert.ok(inserted)
  })

  it('#insert already existent', () => {
    let insert = () => db.collection('products').insert({ sku: 12 })
    assert.throws(insert, Error, 'conflict')
  })

  it('#update', () => {
    let updated = db.collection('products').update({ sku: 12 }, { name: 'Shampoo' })
    debug('updated', updated)
    assert.ok(updated)
  })

  it('#update non existend', () => {
    let update = () => db.collection('products').update({ sku: 42 }, { name: 'Shampoo' })
    assert.throws(update, Error, 'not found')
  })

  it('#upsert', () => {
    let upserted = db.collection('products').upsert({ sku: 32 }, { name: 'Shampoo' })
    debug('upserted', upserted)
    assert.ok(upserted)
  })

  it('#patch', () => {
    let patched = db.collection('products').patch({ sku: 12 }, { name: 'Shampoo' })
    debug('patched', patched)
    assert.ok(patched)
  })
})

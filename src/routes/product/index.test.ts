import request, {Test, SuperTest } from 'supertest'
import app from './../../app'
import sequelize from './../../config/sequelize';
import { itemCreate, item} from './../../mock'

const ENDPOINT= '/product'
const GET = `${ENDPOINT}/${item.sku}`


describe('Product', () => {
  let server: SuperTest<Test>;

  beforeAll(async () => {
    server = request(app)
  })
  beforeEach(async () => {
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.drop();
  })

  afterAll(async () => {
    await sequelize.close();
  })

  it('should return status 201 when body is correct', async () => {
    const res = await server
      .post(ENDPOINT)
      .send(itemCreate)
    expect(res.statusCode).toEqual(201)
  })

  it('should return status 200 and result json in body', async () => {

    const resultCreate = await server
      .post(ENDPOINT)
      .send(itemCreate)
    const res = await server
      .get(GET)
      .send(itemCreate)

    const newItem = {
      ...item,
      createdAt: resultCreate.body.createdAt,
      updatedAt: resultCreate.body.updatedAt,
    }
    expect(res.statusCode).toEqual(200)
    expect(res.body && res.body).toEqual(newItem)
  })

  it('should return status 404 when sku non exists', async () => {

    const res = await server
      .get(`${GET}/3232`)

    expect(res.statusCode).toEqual(404)
  })

  it('should return status 404 when sku non exists', async () => {

    const res = await server
      .delete(`${GET}/3232`)

    expect(res.statusCode).toEqual(404)
  })
  it('should return status 200 and json body when sku exists', async () => {

    await server
      .post(ENDPOINT)
      .send(itemCreate)

    const res = await server
      .delete(GET)

    expect(res.statusCode).toEqual(200)
    expect(res.body && res.body).toEqual({ status: true, message: 'Product deleted' })
  })
})

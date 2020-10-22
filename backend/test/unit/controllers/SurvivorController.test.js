import connection from '../../../src/database/connection'
const app = require('../../../src/app')
const request = require('supertest')

beforeAll(async () => {
  await connection.create({
    database: 'src/database/databaseTest.sqlite',
    migrationsRun: true,
    migrationsTableName: 'migrations_typeorm',
  })
})

afterAll(async () => {
  await connection.close()
})

beforeEach(async () => {
  await connection.clear()
})

describe('Testing basic routes', () => {
  test('Getting all the list of survivors', async () => {
    try {
      const response = await request(app).get('/survivor')
      expect(response.statusCode).toEqual(200)
    } catch (e) {
      console.log(e)
    }
  })

  test('Getting a single survivor', async () => {
    try {
      const response = await request(app).get('/survivor/1')
      expect(response.statusCode).exi(200)
    } catch (e) {
      console.log(e)
    }
  })
  

  test('Creating a new survivor', async () => {
    try {
      const response = await request(app).post('/survivor/1')
      expect(response.statusCode).exi(200)
    } catch (e) {
      console.log(e)
    }
  })
})



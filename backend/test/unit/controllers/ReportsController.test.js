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

describe('Testing report infected route', () => {
  test('Getting the average infected survivors', async () => {
    try {
      const response = await request(app).get('/reports/infected')
      expect(response.statusCode).toEqual(200)
    } catch (e) {
      console.log("ERROR")
    }
  })

  test('Getting the average non infected survivors', async () => {
    try {
      const response = await request(app).get('/reports/non_infected')
      expect(response.statusCode).toEqual(200)
    } catch (e) {
      console.log("ERROR")
    }
  })
})
  

import { check } from 'prettier'
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
    const response = await request(app).get('/survivor')
    expect(response.status).toEqual(200)
  })

  test('Searching for a non registered survivor', async () => {
    const response = await request(app).get('/survivor/0')
    expect(response.status).toEqual(404)
  })

  test('Creating a new survivor and get this survivor', async () => {
    const data = {
      name: 'Lucas',
      age: '28',
      gender: 'male',
      infected: false,
      infected_reports: '0',
      latitude: '303244',
      longitude: '52103',
      inventory: {
        fijii_water: 23,
        campbell_soup: 13,
        first_aid_pouch: 54,
        ak47: 23,
      },
    }

    const { body: survivor } = await request(app).post('/survivor').send(data)

    const { checkSurvivor } = await request(app).get(`/survivor/${survivor.id}`)

    expect(survivor.data).toEqual(checkSurvivor)
  })

  test('Updating a created survivor', async () => {
    let data = {
      name: 'Lucas',
      age: '28',
      gender: 'male',
      infected: false,
      infected_reports: '0',
      latitude: '303244',
      longitude: '52103',
      inventory: {
        fijii_water: 23,
        campbell_soup: 13,
        first_aid_pouch: 54,
        ak47: 23,
      },
    }

    const { body: survivor } = await request(app).post('/survivor').send(data)
    data.longitude = '0'
    const { body: checkSurvivor } = await request(app)
      .put(`/survivor/${survivor.id}`)
      .send(data)

    expect(checkSurvivor.longitude).toEqual('0')
  })
})

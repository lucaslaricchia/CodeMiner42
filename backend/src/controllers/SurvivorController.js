import { getRepository } from 'typeorm'
import survivorView from '../views/survivors_view'
import * as Yup from 'yup'
import { Inventory } from '../models/Inventory'
import { Survivor } from '../models/Survivor'

async function _validateSurvivor(data) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    age: Yup.number().required().max(99),
    gender: Yup.string().required().max(20),
    infected: Yup.boolean().required(),
    infected_reports: Yup.number().required(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    inventory: Yup.object().shape({
      fijii_water: Yup.number().required().default(5),
      campbell_soup: Yup.number().required().default(0),
      first_aid_pouch: Yup.number().required().default(0),
      ak47: Yup.number().required().default(0),
    }),
  })

  await schema.validate(data, {
    abortEarly: false,
  })
}

export default {
  async show(request, response) {
    const { id } = request.params
    const survivorsRepository = getRepository('survivors')

    try {
      const survivor = await survivorsRepository.findOneOrFail(id)
      return response.json(survivorView.render(survivor))
    } catch (err) {
      return response.status(404).json({ error: 'Not Found' })
    }
  },

  async update(request, response) {
    const { id } = request.params
    const survivorsRepository = getRepository('survivors')

    try {
      let survivor = await survivorsRepository.findOneOrFail(id)
      delete request.body.id
      delete request.body.name
      delete request.body.inventory
      Object.keys(request.body).forEach((key) => {
        const item = request.body[key]
        if (item) {
          survivor[key] = item
        }
      })
      survivor = await survivorsRepository.save(survivor)
      return response.json(survivor)
    } catch (err) {
      return response.status(404).json({ error: 'ID Not Found' })
    }
  },

  async index(request, response) {
    const survivorsRepository = getRepository(Survivor)
    const survivors = await survivorsRepository.find()

    return response.json(survivorView.renderMany(survivors))
  },

  async create(request, response) {
    const survivorsRepository = getRepository(Survivor)
    const inventoryRepository = getRepository(Inventory)
    try {
      await _validateSurvivor(request.body)
    } catch (err) {
      return response.status(406).json({ error: 'Not Acceptable' })
    }

    let inventory = await inventoryRepository.create(request.body.inventory)
    await inventoryRepository.save(inventory)

    let survivor = survivorsRepository.create(request.body)

    survivor.inventory = inventory

    survivor = await survivorsRepository.save(survivor)

    return response.json(survivor)
  },
}

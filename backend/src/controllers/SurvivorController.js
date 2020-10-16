import { getRepository } from 'typeorm'
import survivorView from '../views/survivors_view'
import * as Yup from 'yup'
import Inventory from '../models/Inventory'

async function _validateSurvivor(data) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    age: Yup.number().required().max(99),
    gender: Yup.string().required().max(20),
    infected: Yup.boolean().required(),
    infected_reports: Yup.number().required(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
  })

  await schema.validate(data, {
    abortEarly: false,
  })
}

export default {
  async show(request, response) {
    const { id } = request.params

    const survivorsRepository = getRepository('survivors')

    const survivor = await survivorsRepository.findOneOrFail(id)

    return response.json(survivorView.render(survivor))
  },

  async update(request, response) {
    const { id } = request.params
    const survivorsRepository = getRepository('survivors')
    let survivor = await survivorsRepository.findOneOrFail(id)

    delete request.body.id
    delete request.body.name
    Object.keys(request.body).forEach((key) => {
      const item = request.body[key]
      if (item) {
        survivor[key] = item
      }
    })
    survivor = await survivorsRepository.save(survivor)
    return response.status(201).json(survivor)
  },

  async index(request, response) {
    const survivorsRepository = getRepository('survivors')
    const survivors = await survivorsRepository.find()

    return response.json(survivorView.renderMany(survivors))
  },

  async create(request, response) {
    const survivorsRepository = getRepository('survivors')

    await _validateSurvivor(request.body)

    let survivor = await survivorsRepository.create(request.body)

    survivor.inventory = new Inventory()
    await survivorsRepository.save(survivor)

    return response.status(201).json(survivor)
  },
}

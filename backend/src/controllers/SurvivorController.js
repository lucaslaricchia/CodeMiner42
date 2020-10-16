import { getRepository } from 'typeorm'
import Survivor from '../models/Survivor.js'
import survivorView from '../views/survivors_view.js'
import * as Yup from 'yup'

export default {
  async show(request, response) {
    const { id } = request.params

    const survivorsRepository = getRepository(Survivor)

    const survivor = await survivorsRepository.findOneOrFail(id)

    return response.json(survivorView.render(survivor))
  },

  async index(request, response) {
    const survivorsRepository = getRepository(Survivor)

    const survivors = await survivorsRepository.find()

    return response.json(survivorView.renderMany(survivors))
  },

  async create(request, response) {
    const {
      name,
      age,
      gender,
      infected,
      infected_reports,
      latitude,
      longitude,
    } = request.body

    const survivorsRepository = getRepository('survivors')

    const data = {
      name,
      age,
      gender,
      infected,
      infected_reports,
      latitude,
      longitude,
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      age: Yup.number().required().max(2),
      gender: Yup.string().required().max(20),
      infected: Yup.boolean().required(),
      infected_reports: Yup.number().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
    })

    await schema.validate(data, {
      abortEarly: false,
    })

    const survivor = survivorsRepository.create(data)

    await survivorsRepository.save(survivor)

    return response.status(201).json(survivor)
  },
}

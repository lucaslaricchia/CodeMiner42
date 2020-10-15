import { getRepository } from 'typeorm';
import Survivor from '../models/Survivor';
import survivorView from '../views/survivors_view';
import * as Yup from 'yup';

export default {

    async show(request, response) {

        const { id } = request.params;

        const survivorsRepository = getRepository(Survivor);

        const survivor = await survivorsRepository.findOneOrFail(id);

        return response.json(survivorView.render(survivor));
    },

    async index(request, response) {
        const survivorsRepository = getRepository(Survivor);

        const survivors = await survivorsRepository.find();

        return response.json(survivorView.renderMany(survivors));
    },


    async create(request, response) {

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = request.body;

        const survivorsRepository = getRepository(Survivor);
 
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const survivor = survivorsRepository.create(data);

        await survivorsRepository.save(survivor);

        return response.status(201).json(survivor);

    }
}
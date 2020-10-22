import { getRepository } from 'typeorm'
import { Survivor } from '../models/Survivor'

async function() {}
const survivorRepository  = getRepository(Survivor)

export const survivorService = {
   findSurvivorById: async function (id) {
    return survivorsRepository.findOneOrFail(id);
   }
}
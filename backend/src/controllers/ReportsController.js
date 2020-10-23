import { getRepository } from 'typeorm'

export default {
  async infected(request, response) {
    const survivorsRepository = getRepository('survivors')
    const survivorsTotal = await survivorsRepository.count()
    const survivorsInfected = await survivorsRepository.count({
      infected: true,
    })
    return response.json({
      report: {
        desripton: 'Average of infected survivors',
        average_infected: survivorsInfected / survivorsTotal,
      },
    })
  },

  async nonInfected(request, response) {
    
    const survivorsRepository = getRepository('survivors')
    const survivorsTotal = await survivorsRepository.count()
    const survivorsNonInfected = await survivorsRepository.count({
      infected: false,
    })
    return response.json({
      report: {
        desripton: 'Average of Non infected survivors',
        average_infected: survivorsNonInfected / survivorsTotal,
      },
    })
  },
}

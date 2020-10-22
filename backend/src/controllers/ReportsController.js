import { getRepository } from 'typeorm'

export default {

    async infected(request, response){

        return response.json("Hello")
    },

    async nonInfected(request, response){

        return response.json("Hello")
    },

    async survivorsInventory(request, response){

        return response.json("Hello")
    },

    async infectedPoints(request, response){
        
        return response.json("Hello")
    },
}
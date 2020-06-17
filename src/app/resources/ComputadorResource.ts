import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"

import ComputadorRepository from "../repositories/estoque/ComputadorRepository"

import createComputador from "../services/estoque/computadores/CreateComputador"
import updateComputador from "../services/estoque/computadores/UpdateComputador"
import deleteComputador from "../services/estoque/computadores/DeleteComputador"

class ComputadorResource {

    public async getAll(req:Request, res:Response) {
        const computadorRepository = getCustomRepository(ComputadorRepository)

        const impressoras = await computadorRepository.find();

        return res.status(200).send(impressoras)
    }

    public async getById(req:Request, res:Response) {
        const computadorRepository = getCustomRepository(ComputadorRepository)

        const { id } = req.params

        const computador = await computadorRepository.findOne({ id })

        if (computador == null)
            return res.status(404).send({ message: "Computador não encontrado!" })

        return res.status(200).send(computador)
    }

    public async insert(req:Request, res:Response) {
        const { fonte,
                memoriaRam,
                mouse,
                monitor,
                placaMae,
                placaRede,
                placaVideo,
                processador,
                teclado } = req.body
        
        const computador = await createComputador.execute({
            fonte,
            memoriaRam,
            mouse,
            monitor,
            placaMae,
            placaRede,
            placaVideo,
            processador,
            teclado
        })

        return res.status(201).send(computador)
    }

    public async update(req:Request, res:Response) {
        const { id } = req.params
        const { 
            fonte,
            memoriaRam,
            monitor,
            mouse,
            placaMae,
            placaRede,
            placaVideo,
            processador,
            teclado
         } = req.body

         const computador = await updateComputador.execute({ 
            id,
            fonte,
            memoriaRam,
            monitor,
            mouse,
            placaMae,
            placaRede,
            placaVideo,
            processador,
            teclado
          })

        if (computador == null)
            return res.status(404).send({ message: "Computador não encontrado!" })

        return res.status(200).send({ status: "Updated", computador })
    }

    public async delete(req:Request, res:Response) {
        const { id } = req.params

        const deleteStatus = await deleteComputador.execute({ id })

        if (deleteStatus == true)
            return res.status(400).send({ message: "Comuputador não encontrado" })
            
        return res.status(200).send({ message: "Computador deletado com sucesso!" })
    }
}

export default new ComputadorResource()
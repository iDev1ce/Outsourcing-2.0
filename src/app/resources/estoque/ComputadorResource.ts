import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"

import ComputadorRepository from "../../repositories/estoque/ComputadorRepository"
import AppError from "../../../errors/AppError"

import createComputador from "../../services/estoque/computadores/CreateComputador"
import updateComputador from "../../services/estoque/computadores/UpdateComputador"
import deleteComputador from "../../services/estoque/computadores/DeleteComputador"

class ComputadorResource {

    public async getAll(req:Request, res:Response) {
        try {
            const computadorRepository = getCustomRepository(ComputadorRepository)
    
            const impressoras = await computadorRepository.find();

            if(!impressoras)
                throw new AppError("Computador não encontrado", 404)
    
            return res.status(200).send(impressoras)
        } catch (err) {
            return res.status(err.statusCode).send({ error: err.message })
        }
    }

    public async getById(req:Request, res:Response) {
        const computadorRepository = getCustomRepository(ComputadorRepository)

        try {
            const { id } = req.params
    
            const computador = await computadorRepository.findOne({ id })

            if(!computador)
                throw new AppError("Computador não encontrado", 404)
    
            return res.status(200).send(computador)
        } catch(err) {
            return res.status(err.statusCode).send({ error: err.message })
        }
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
        
        try {
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
        } catch (err) {
            return res.status(err.statusCode).send({ error: err.message })
        }
    }

    public async update(req:Request, res:Response) {
        const { id } = req.params
        
        try {
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
    
            return res.status(200).send({ status: "Updated", computador })
        } catch(err) {
            return res.status(err.statusCode).send({ error: err.message })
        }
    }

    public async delete(req:Request, res:Response) {
        const { id } = req.params

        try {
            const deleteStatus = await deleteComputador.execute({ id })

            if (!deleteStatus)
                throw new AppError("Computador não encontrado", 404)
                
            return res.status(200).send({ message: "Computador deletado com sucesso!" })
        } catch (err) {
            return res.status(err.statusCode).send({ error: err.message })
        }
    }
}

export default new ComputadorResource()
import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"

import ImpressoraRepository from "../../repositories/estoque/ImpressoraRepository"

import createImpressora from "../../services/estoque/impressoras/CreateImpressora"
import updateImpressora from "../../services/estoque/impressoras/UpdateImpressora"
import deleteImpressora from "../../services/estoque/impressoras/DeleteImpressora"
import AppError from "../../../errors/AppError"

class ImpressoraResource {

    public async getAll(req:Request, res:Response) {
        try {
            const impressoraRepository = getCustomRepository(ImpressoraRepository)

            const impressoras = await impressoraRepository.find()

            return res.status(200).send(impressoras)
        } catch (err) {
            return res.status(err.statusCode).send({ error: err.message })
        }
    }

    public async getById(req:Request, res:Response) {
        try {
            const impressoraRepository = getCustomRepository(ImpressoraRepository)
    
            const { id } = req.params
    
            const impressora = await impressoraRepository.findOne({ id })
    
            if (!impressora) 
                throw new AppError("Impressora não encontrada", 404)
    
            return res.status(200).send(impressora)
        } catch (err) {
            return res.status(err.statusCode).send({ error: err.message })
        }
    }

    public async insert(req:Request, res:Response) {
        try {
            const { marca, modelo, tipo } = req.body

            const impressora = await createImpressora.execute({ marca, modelo, tipo })

            return res.status(201).send(impressora)
        } catch (err) {
            return res.status(err.statusCode).send({ error: err.message })
        }
    }

    public async update(req:Request, res:Response) {
        try {
            const { id } = req.params
            const { marca, modelo, tipo } = req.body

            const impressora = await updateImpressora.execute({ id, marca, modelo, tipo })

            if (!impressora)
                throw new AppError("Impressora não encontrada", 404)

            return res.status(200).send({ status: "Updated", impressora })
        } catch (err) {
            return res.status(err.statusCode).send({ error: err.message })
        }
    }

    public async delete(req:Request, res:Response) {
        try {
            const { id } = req.params
    
            const deleteStatus = await deleteImpressora.execute({ id })
    
            if (!deleteStatus)
                throw new AppError("Impressora não encontrada", 404)
            
            return res.status(404).send({ message: "Impressora não encontrada" })
        } catch (err) {
            return res.status(err.statusCode).send({ error: err.message })
        }
    }
}

export default new ImpressoraResource()
import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"

import ImpressoraRepository from "../repositories/ImpressoraRepository"
import Impressora from "../models/Impressora"

import createImpressora from "../services/impressoras/CreateImpressora"
import updateImpressora from "../services/impressoras/UpdateImpressora"
import deleteImpressora from "../services/impressoras/DeleteImpressora"

class ImpressoraResource {

    public async getAll(req:Request, res:Response) {
        const impressoraRepository = getCustomRepository(ImpressoraRepository)

        const impressoras = await impressoraRepository.find();

        return res.status(200).send(impressoras)
    }

    public async insert(req:Request, res:Response) {
        const { marca, modelo, tipo } = req.body

        const impressora = await createImpressora.execute({ marca, modelo, tipo })

        return res.status(201).send(impressora)
    }

    public async update(req:Request, res:Response) {
        const { id } = req.params
        const { marca, modelo, tipo } = req.body

        const impressora = await updateImpressora.execute({ id, marca, modelo, tipo })

        if (impressora == null)
            return res.status(404).send({ message: "Impressora não encontrada!" })

        return res.status(200).send({ status: "Updated", impressora })
    }

    public async delete(req:Request, res:Response) {
        const { id } = req.params

        const deleteStatus = await deleteImpressora.execute({ id })

        if (deleteStatus == true)
            return res.status(200).send({ message: "Impressora deletada com sucesso!" })
        
        return res.status(404).send({ message: "Impressora não encontrada" })
    }
}

export default new ImpressoraResource()
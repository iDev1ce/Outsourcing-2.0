import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"

import ImpressoraRepository from "../repositories/ImpressoraRepository"
import Impressora from "../models/Impressora"

import createImpressora from "../services/impressoras/CreateImpressora"

class ImpressoraResource {

    public async getAll(req:Request, res:Response) {
        const impressoraRepository = getCustomRepository(ImpressoraRepository)

        const impressoras = await impressoraRepository.find();

        return res.status(200).send(impressoras)
    }

    public async insert(req:Request, res:Response) {
        const { marca, modelo, tipo } = req.body

        const impressora = createImpressora.execute({ marca, modelo, tipo })

        return res.status(201).send(impressora)
    }
}

export default new ImpressoraResource()
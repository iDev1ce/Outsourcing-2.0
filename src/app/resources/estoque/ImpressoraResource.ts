import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"

import ImpressoraRepository from "../../repositories/estoque/ImpressoraRepository"

import createImpressora from "../../services/estoque/impressoras/CreateImpressora"
import updateImpressora from "../../services/estoque/impressoras/UpdateImpressora"
import deleteImpressora from "../../services/estoque/impressoras/DeleteImpressora"

class ImpressoraResource {

    public async getAll(req:Request, res:Response) {
        const impressoraRepository = getCustomRepository(ImpressoraRepository)

        const impressoras = await impressoraRepository.find()

        if(!impressoras)
            return res.status(404).send({ message: "Não há impressoras" })

        return res.status(200).send(impressoras)
    }

    public async getById(req:Request, res:Response) {
        const impressoraRepository = getCustomRepository(ImpressoraRepository)

        const { id } = req.params

        const impressora = await impressoraRepository.findOne({ id })

        if(!impressora)
            return res.status(404).send({ message: "Não há impressora" })

        return res.status(200).send(impressora)
    }

    public async insert(req:Request, res:Response) {
        const { marca, modelo, tipo } = req.body

        const impressora = await createImpressora.execute({ marca, modelo, tipo })

        if(!impressora)
            return res.status(400).send({ message: "Erro ao salvar impressora" })

        return res.status(201).send(impressora)
    }

    public async update(req:Request, res:Response) {
        const { id } = req.params
        const { marca, modelo, tipo } = req.body

        const impressora = await updateImpressora.execute({ id, marca, modelo, tipo })

        if(!impressora)
            return res.status(404).send({ message: "Não há impressora" })

        return res.status(200).send({ status: "Updated", impressora })
    }

    public async delete(req:Request, res:Response) {
        const { id } = req.params

        const deleteStatus = await deleteImpressora.execute({ id })

        if(deleteStatus == null)
            return res.status(404).send({ message: "Não há impressora" })
        
        return res.status(200).send({ message: "Impressora deletada com sucesso!" })
    }
}

export default new ImpressoraResource()
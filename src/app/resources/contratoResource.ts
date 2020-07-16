import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import ContratoRepository from "@app/repositories/ContratoRepository"

class ContratoResource {
    public async insert(req: Request, res: Response) {

    }

    public async getAll(req: Request, res: Response) {
        const contratoRepository = getCustomRepository(ContratoRepository)

        const contratos = await contratoRepository.find()

        if (!contratos)
            return res.status(404).send({ message: "Não há contratos" })

        return res.status(200).send(contratos)
    }

    public async getById(req: Request, res: Response) {
        const contratoRepository = getCustomRepository(ContratoRepository)

        const { id } = req.params

        const contrato = await contratoRepository.findOne({ id })

        if (!contrato)
            return res.status(404).send({ message: "Não existe contrato" })
        
        return res.status(200).send(contrato)
    }
}

export default new ContratoResource()
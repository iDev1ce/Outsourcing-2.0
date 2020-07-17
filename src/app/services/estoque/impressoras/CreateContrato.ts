import { getCustomRepository } from "typeorm";

import Contrato from "@app/models/Contrato";
import ContratoRepository from "@app/repositories/ContratoRepository"
import ImpressoraRepository from "@app/repositories/estoque/impressora/ImpressoraRepository"

interface Request {
    id_impressora: string
    id_cliente: string
}

class CreateContrato {
    public async execute({ id_impressora, id_cliente }: Request): Promise<Contrato | null> {
        const contratoRepository = getCustomRepository(ContratoRepository)
        const impressoraRepository = getCustomRepository(ImpressoraRepository)
        
        const impressora = await impressoraRepository.findOne({
            where: { id: id_impressora }
        })

        if(!impressora) {
            return null
        }

        const contrato = contratoRepository.create({
            id_cliente,
            id_funcionario: impressora.id_funcionario
        })
        
        await contratoRepository.save(contrato)
        
        impressora.id_contrato = contrato.id
        
        const impressoraSave = impressoraRepository.create(impressora)
        await impressoraRepository.save(impressoraSave)

        return contrato
    }
}

export default new CreateContrato()
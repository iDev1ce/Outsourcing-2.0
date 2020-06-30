import { getCustomRepository } from "typeorm";

import Contrato from "../../../models/Contrato";
import ContratoRepository from "../../../repositories/ContratoRepository"
import ImpressoraRepository from "../../../repositories/estoque/ImpressoraRepository"
import Impressora from "../../../models/estoque/Impressora";

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

        console.log(contrato)

        await contratoRepository.save(contrato)

        return contrato
    }
}

export default new CreateContrato()
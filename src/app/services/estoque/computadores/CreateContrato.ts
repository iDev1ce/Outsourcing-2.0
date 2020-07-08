import { getCustomRepository } from "typeorm"

import Contrato from "@app/models/Contrato";
import ContratoRepository from "@app/repositories/ContratoRepository"
import ComputadorRepository from "@app/repositories/estoque/ComputadorRepository";

interface Request {
    id_computador:string
    id_cliente:string
}

class CreateContrato {
    public async execute({ id_computador, id_cliente }:Request): Promise<Contrato | null> {
        const contratoRepository = getCustomRepository(ContratoRepository)
        const computadorRepository = getCustomRepository(ComputadorRepository)

        const computador = await computadorRepository.findOne({
            where: { id: id_computador }
        })

        if (!computador)
            return null
        
        const contrato = contratoRepository.create({
            id_cliente,
            id_funcionario: computador.id_funcionario
        })
        
        await contratoRepository.save(contrato)
        
        computador.contrato_id = contrato.id

        const computadorSave = computadorRepository.create(computador)
        await computadorRepository.save(computadorSave)

        return contrato
    }
}

export default new CreateContrato()
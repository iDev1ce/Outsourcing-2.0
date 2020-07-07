import { getCustomRepository, RelationId } from "typeorm";

import Chamados from "@app/models/Chamados";
import ChamadoRepository from "@app/repositories/ChamadoRepository"
import ComputadorRepository from "@app/repositories/estoque/ComputadorRepository";

interface Request {
    id_maquina: string
}

class CreateChamado {
    public async execute({ id_maquina }: Request): Promise<Chamados | null> {
        const chamadoRepository = getCustomRepository(ChamadoRepository)
        const computadorRepository = getCustomRepository(ComputadorRepository)

        const computador = await computadorRepository.findOne({ where: { id: id_maquina } })
        
        if(!computador)
            return null

        const chamados = chamadoRepository.create({
            id_computador: id_maquina,
            id_contrato: computador.contrato_id
        })

        /**
         * SELECT COM INNER JOIN
         * 
         *  const contrato = await chamadoRepository.find({
         *      relations: ['contrato'],
         *      where: { id_computador: id_maquina }
         *  })
         * 
         *  if(!contrato)
         *      return null
         * 
         * console.log(contrato)
         */

        await chamadoRepository.save(chamados)

        return chamados
    }
}

export default new CreateChamado()
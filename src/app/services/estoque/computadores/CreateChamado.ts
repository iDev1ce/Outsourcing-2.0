import { getCustomRepository } from "typeorm";

import Chamados from "@app/models/Chamados";
import ChamadoRepository from "@app/repositories/ChamadoRepository"
import ComputadorRepository from "@app/repositories/estoque/ComputadorRepository";

interface Request {
    id_maquina: string
    id_cliente: string
    descricao: string
}

class CreateChamado {
    public async execute({ id_maquina, id_cliente, descricao }: Request): Promise<Chamados | null> {
        const chamadoRepository = getCustomRepository(ChamadoRepository)
        const computadorRepository = getCustomRepository(ComputadorRepository)
        
        const computador = await computadorRepository.findOne({ where: { id: id_maquina } })

        if(!computador)
            return null
        
        const contrato = chamadoRepository.create({
            id_computador: id_maquina,
            id_contrato: computador.contrato_id,
            id_cliente,
            id_funcionario: computador.id_funcionario,
            descricao
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

        // const contrato = await chamadoRepository.find({
        //     relations: [
        //         'contrato',
        //         'computador'
        //     ],
        //     where: { id_computador: id_maquina }
        // })

        console.log(contrato)

        if(!contrato)
            return null

        await chamadoRepository.save(contrato)

        return contrato
    }
}

export default new CreateChamado()
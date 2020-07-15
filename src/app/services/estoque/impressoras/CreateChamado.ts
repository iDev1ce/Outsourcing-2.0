import { getCustomRepository } from "typeorm";

import Chamados from "@app/models/Chamados";
import ChamadoRepository from "@app/repositories/ChamadoRepository"
import ImpressoraRepository from "@app/repositories/estoque/ImpressoraRepository";

interface Request {
    id_impressora: string
    id_cliente: string
    descricao: string
}

class CreateChamado {
    public async execute({ id_impressora, id_cliente, descricao }: Request): Promise<Chamados | null> {
        const chamadoRepository = getCustomRepository(ChamadoRepository)
        const impressoraRepository = getCustomRepository(ImpressoraRepository)
        
        const impressora = await impressoraRepository.findOne({ where: { id: id_impressora } })

        if(!impressora)
            return null
        
        const contrato = chamadoRepository.create({
            id_impressora,
            id_contrato: impressora.id_contrato,
            id_cliente,
            id_funcionario: impressora.id_funcionario,
            descricao
        })

        // const contrato = await chamadoRepository.find({
        //     relations: [
        //         'contrato',
        //         'impressora'
        //     ],
        //     where: { id_impressora }
        // })

        if(!contrato)
            return null

        await chamadoRepository.save(contrato)

        return contrato
    }
}

export default new CreateChamado()
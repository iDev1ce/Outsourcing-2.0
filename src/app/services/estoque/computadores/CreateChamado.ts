import { getCustomRepository, RelationId } from "typeorm";

import Chamados from "@app/models/Chamados";
import ChamadoRepository from "@app/repositories/ChamadoRepository"

interface Request {
    id_maquina: string
}

class CreateChamado {
    public async execute({ id_maquina }: Request): Promise<Chamados | null> {
        const chamadoRepository = getCustomRepository(ChamadoRepository)

        const chamados = chamadoRepository.create({
            id_computador: id_maquina
        })

        await chamadoRepository.save(chamados)

        return chamados
    }
}

export default new CreateChamado()
import Computador from "../../../models/estoque/computador/Computador";

import ComputadorRepository from "../../../repositories/estoque/computador/ComputadorRepository"
import { getCustomRepository } from "typeorm";

interface Request {
    id: string
    fonte:string
    memoriaRam:string
    monitor:string
    mouse:string
    teclado:string
    processador:string
    placaMae:string
    placaRede:string
    placaVideo:string
}

class UpdateComputador {

    public async execute({ id, fonte, memoriaRam, mouse, monitor, placaMae, placaRede, placaVideo, processador, teclado }:Request):Promise<Computador | null> {
        const computadorRepository = getCustomRepository(ComputadorRepository)

        const existingComputador = await computadorRepository.findOne(id)

        if (!existingComputador)
            return null

        const computador = computadorRepository.create({ id, fonte, memoriaRam, mouse, placaMae, monitor, placaRede, placaVideo, processador, teclado })
        await computadorRepository.save(computador)

        return computador
    }
}

export default new UpdateComputador()
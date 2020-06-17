import Computador from "../../../models/Computador";

import ComputadorRepository from "../../../repositories/estoque/ComputadorRepository"
import { getCustomRepository } from "typeorm";

interface Request {
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

class CreateComputador {

    public async execute({ fonte, memoriaRam, mouse, placaMae, monitor, placaRede, placaVideo, processador, teclado }:Request):Promise<Computador | null> {
        const computadorRepository = getCustomRepository(ComputadorRepository)

        const computador = computadorRepository.create({ fonte, memoriaRam, mouse, monitor, placaMae, placaRede, placaVideo, processador, teclado })
        await computadorRepository.save(computador)

        return computador
    }
}

export default new CreateComputador()
import { getCustomRepository } from "typeorm"

import Computador from "@app/models/estoque/computador/Computador"
import ComputadorRepository from "@app/repositories/estoque/computador/ComputadorRepository"
import IUpdate from "@app/dto/computador/IUpdate"

class UpdateComputador {

    public async execute({ 
        id,
        fonte, 
        memoriaRam, 
        mouse, 
        monitor, 
        placaMae, 
        placaRede, 
        placaVideo, 
        processador, 
        teclado, 
        valor 
    }:IUpdate):Promise<Computador | null> {
        const computadorRepository = getCustomRepository(ComputadorRepository)

        const existingComputador = await computadorRepository.findOne(id)

        if (!existingComputador)
            return null

        const computador = computadorRepository.create({ 
            id, 
            fonte, 
            memoriaRam, 
            mouse, 
            placaMae, 
            monitor, 
            placaRede, 
            placaVideo, 
            processador, 
            teclado, 
            valor 
        })
        await computadorRepository.save(computador)

        return computador
    }
}

export default new UpdateComputador()
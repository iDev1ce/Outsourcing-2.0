import { getCustomRepository } from "typeorm";

import Computador from "../../../models/estoque/computador/Computador";
import ComputadorRepository from "../../../repositories/estoque/computador/ComputadorRepository"

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
    id_funcionario:string
}

class CreateComputador {

    public async execute(
        { fonte, memoriaRam, mouse, placaMae, monitor, placaRede, placaVideo, processador, teclado, id_funcionario }:Request
    ):Promise<Computador | null> {
        const computadorRepository = getCustomRepository(ComputadorRepository)

        const computador = computadorRepository.create({ 
            fonte, 
            memoriaRam,
            mouse, 
            monitor, 
            placaMae, 
            placaRede, 
            placaVideo, 
            processador, 
            teclado,
            id_funcionario
        })
        
        if (!await computadorRepository.save(computador))
            return null

        return computador
    }
}

export default new CreateComputador()
import { getCustomRepository } from "typeorm";

import Computador from "../../../models/estoque/Computador";
import ComputadorRepository from "../../../repositories/estoque/ComputadorRepository"
import AppError from "../../../../errors/AppError";

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

    public async execute(
        { fonte, memoriaRam, mouse, placaMae, monitor, placaRede, placaVideo, processador, teclado }:Request
    ):Promise<Computador | null> {
        try {
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
                teclado 
            })
            
            await computadorRepository.save(computador)

            return computador
        } catch (err) {
            throw new AppError("Erro ao salvar computador")
        }
    }
}

export default new CreateComputador()
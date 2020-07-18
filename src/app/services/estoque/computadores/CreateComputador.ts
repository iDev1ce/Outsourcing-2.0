import { getCustomRepository } from "typeorm";

import Computador from "@app/models/estoque/computador/Computador";
import ComputadorRepository from "@app/repositories/estoque/computador/ComputadorRepository"
import ICreateComputador from "@app/dto/computador/ICreate"

class CreateComputador {

    public async execute(
        {
            fonte, 
            memoriaRam, 
            mouse, 
            placaMae, 
            monitor, 
            placaRede, 
            placaVideo, 
            processador, 
            teclado, 
            id_funcionario, 
            valor 
        }:ICreateComputador
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
            id_funcionario,
            valor
        })
        
        if (!await computadorRepository.save(computador))
            return null

        return computador
    }
}

export default new CreateComputador()
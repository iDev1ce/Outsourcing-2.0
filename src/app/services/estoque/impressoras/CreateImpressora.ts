import { getCustomRepository } from "typeorm";

import Impressora from "@app/models/estoque/impressora/Impressora";
import ImpressoraRepository from "@app/repositories/estoque/impressora/ImpressoraRepository"
import ICreate from "@app/dto/impressora/ICreate";

class CreateImpressora {

    public async execute({ marca, modelo, tipo, id_funcionario, valor }:ICreate):Promise<Impressora | null> {
        const impressoraRepository = getCustomRepository(ImpressoraRepository)

        const impressora = impressoraRepository.create({ 
            marca, 
            modelo, 
            tipo,
            id_funcionario,
            valor
        })

        if (!await impressoraRepository.save(impressora))
            return null

        return impressora
    }
}

export default new CreateImpressora()
import { getCustomRepository } from "typeorm";

import Impressora from "@app/models/estoque/impressora/Impressora";
import ImpressoraRepository from "@app/repositories/estoque/impressora/ImpressoraRepository"

interface Request {
    marca:string
    modelo:string
    tipo:string
    id_funcionario: string
    valor: string
}

class CreateImpressora {

    public async execute({ marca, modelo, tipo, id_funcionario, valor }:Request):Promise<Impressora | null> {
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
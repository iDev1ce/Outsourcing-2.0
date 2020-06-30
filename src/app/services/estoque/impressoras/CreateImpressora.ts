import { getCustomRepository } from "typeorm";

import Impressora from "../../../models/estoque/Impressora";
import ImpressoraRepository from "../../../repositories/estoque/ImpressoraRepository"

interface Request {
    marca:string
    modelo:string
    tipo:string
    id_funcionario: string
}

class CreateImpressora {

    public async execute({ marca, modelo, tipo, id_funcionario }:Request):Promise<Impressora | null> {
        const impressoraRepository = getCustomRepository(ImpressoraRepository)

        const impressora = impressoraRepository.create({ 
            marca, 
            modelo, 
            tipo,
            id_funcionario
        })

        if (!await impressoraRepository.save(impressora))
            return null

        return impressora
    }
}

export default new CreateImpressora()
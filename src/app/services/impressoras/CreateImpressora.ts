import Impressora from "../../models/Impressora";

import ImpressoraRepository from "../../repositories/ImpressoraRepository"
import { getCustomRepository } from "typeorm";

interface Request {
    marca:string
    modelo:string
    tipo:string
}

class CreateImpressora {

    public async execute({ marca, modelo, tipo }:Request):Promise<Impressora | null> {
        const impressoraRepository = getCustomRepository(ImpressoraRepository)

        const impressora = impressoraRepository.create({ marca, modelo, tipo})
        await impressoraRepository.save(impressora)

        return impressora
    }
}

export default new CreateImpressora()
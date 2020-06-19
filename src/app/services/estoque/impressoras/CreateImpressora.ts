import Impressora from "../../../models/estoque/Impressora";

import ImpressoraRepository from "../../../repositories/estoque/ImpressoraRepository"
import { getCustomRepository } from "typeorm";
import AppError from "../../../../errors/AppError";

interface Request {
    marca:string
    modelo:string
    tipo:string
}

class CreateImpressora {

    public async execute({ marca, modelo, tipo }:Request):Promise<Impressora | false> {
        try {
            const impressoraRepository = getCustomRepository(ImpressoraRepository)
    
            const impressora = impressoraRepository.create({ marca, modelo, tipo})
            await impressoraRepository.save(impressora)
    
            return impressora
        } catch (err) {
            return false
        }
    }
}

export default new CreateImpressora()
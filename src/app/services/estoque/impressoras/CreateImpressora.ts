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

    public async execute({ marca, modelo, tipo }:Request):Promise<Impressora | null> {
        const impressoraRepository = getCustomRepository(ImpressoraRepository)

        const impressora = impressoraRepository.create({ marca, modelo, tipo})
        
        if (!await impressoraRepository.save(impressora))
            throw new AppError("Erro ao salvar impressora")

        return impressora
    }
}

export default new CreateImpressora()
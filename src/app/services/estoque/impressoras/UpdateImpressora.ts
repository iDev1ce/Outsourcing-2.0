import Impressora from "../../../models/estoque/Impressora";

import ImpressoraRepository from "../../../repositories/estoque/ImpressoraRepository"
import { getCustomRepository } from "typeorm";
import AppError from "../../../../errors/AppError";

interface Request {
    id:string
    marca:string
    modelo:string
    tipo:string
}

class UpdateImpressora {

    public async execute({ id, marca, modelo, tipo }:Request):Promise<Impressora | false> {
        const impressoraRepository = getCustomRepository(ImpressoraRepository)

        const existingImpressora = await impressoraRepository.findOne(id)

        if (!existingImpressora)
            return false

        const impressora = impressoraRepository.create({ id, marca, modelo, tipo})
        await impressoraRepository.save(impressora)

        return impressora
    }
}

export default new UpdateImpressora()
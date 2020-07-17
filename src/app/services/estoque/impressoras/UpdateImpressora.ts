import { getCustomRepository } from "typeorm";

import Impressora from "@app/models/estoque/impressora/Impressora";
import ImpressoraRepository from "@app/repositories/estoque/impressora/ImpressoraRepository"

interface Request {
    id:string
    marca:string
    modelo:string
    tipo:string
    valor:string
}

class UpdateImpressora {

    public async execute({ id, marca, modelo, tipo, valor }:Request):Promise<Impressora | null> {
        const impressoraRepository = getCustomRepository(ImpressoraRepository)

        const existingImpressora = await impressoraRepository.findOne(id)

        if (!existingImpressora)
            return null

        const impressora = impressoraRepository.create({ id, marca, modelo, tipo, valor })
        await impressoraRepository.save(impressora)

        return impressora
    }
}

export default new UpdateImpressora()
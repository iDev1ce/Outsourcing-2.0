import Impressora from "../../models/Impressora";

import ImpressoraRepository from "../../repositories/ImpressoraRepository"
import { getCustomRepository } from "typeorm";

interface Request {
    id: string
}

class DeleteImpressora {

    public async execute({ id }:Request):Promise<true | false> {
        const impressoraRepository = getCustomRepository(ImpressoraRepository)

        const status = await impressoraRepository.delete({ id })

        if (status.affected == 0)
            return false 

        return true
    }
}

export default new DeleteImpressora()
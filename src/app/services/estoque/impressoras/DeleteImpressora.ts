import Impressora from "../../../models/estoque/Impressora";

import ImpressoraRepository from "../../../repositories/estoque/ImpressoraRepository"
import { getCustomRepository } from "typeorm";
import AppError from "../../../../errors/AppError";

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
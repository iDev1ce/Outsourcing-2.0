import { getCustomRepository } from "typeorm"

import ImpressoraRepository from "@app/repositories/estoque/ImpressoraRepository"

interface Request {
    id: string
}

class DeleteImpressora {

    public async execute({ id }:Request):Promise<true | null> {
        const impressoraRepository = getCustomRepository(ImpressoraRepository)

        const status = await impressoraRepository.delete({ id })

        if (status.affected == 0)
            return null

        return true
    }
}

export default new DeleteImpressora()
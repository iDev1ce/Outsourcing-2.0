import { getCustomRepository } from "typeorm"

import ImpressoraRepository from "@app/repositories/estoque/impressora/ImpressoraRepository"
import IDelete from "@app/dto/notebook/IDelete"

class DeleteImpressora {

    public async execute({ id }:IDelete):Promise<true | null> {
        const impressoraRepository = getCustomRepository(ImpressoraRepository)

        const status = await impressoraRepository.delete({ id })

        if (status.affected == 0)
            return null

        return true
    }
}

export default new DeleteImpressora()
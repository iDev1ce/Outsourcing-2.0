import ImpressoraRepository from "../../../repositories/estoque/ImpressoraRepository"
import { getCustomRepository } from "typeorm";

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
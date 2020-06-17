import Computador from "../../../models/Computador";

import ComputadorRepository from "../../../repositories/estoque/ComputadorRepository"
import { getCustomRepository } from "typeorm";

interface Request {
    id: string
}

class DeleteImpressora {

    public async execute({ id }:Request):Promise<true | false> {
        const computadorRepository = getCustomRepository(ComputadorRepository)

        const status = await computadorRepository.delete({ id })

        if (status.affected == 0)
            return false 

        return true
    }
}

export default new DeleteImpressora()
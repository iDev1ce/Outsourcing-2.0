import { getCustomRepository } from "typeorm";

import ComputadorRepository from "../../../repositories/estoque/ComputadorRepository"

interface Request {
    id: string
}

class DeleteComputador {

    public async execute({ id }:Request):Promise<true | false> {
        const computadorRepository = getCustomRepository(ComputadorRepository)

        const status = await computadorRepository.delete({ id })

        if (status.affected == 0)
            return false

        return true
    }
}

export default new DeleteComputador()
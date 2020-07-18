import { getCustomRepository } from "typeorm";

import ComputadorRepository from "@app/repositories/estoque/computador/ComputadorRepository"
import IDelete from "@app/dto/computador/IDelete"

class DeleteComputador {

    public async execute({ id }:IDelete):Promise<true | false> {
        const computadorRepository = getCustomRepository(ComputadorRepository)

        const status = await computadorRepository.delete({ id })

        if (status.affected == 0)
            return false

        return true
    }
}

export default new DeleteComputador()
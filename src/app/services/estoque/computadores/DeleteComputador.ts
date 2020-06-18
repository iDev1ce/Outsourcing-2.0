import { getCustomRepository } from "typeorm";

import Computador from "../../../models/estoque/Computador";
import ComputadorRepository from "../../../repositories/estoque/ComputadorRepository"
import AppError from "../../../../errors/AppError"

interface Request {
    id: string
}

class DeleteImpressora {

    public async execute({ id }:Request):Promise<true | null> {
        const computadorRepository = getCustomRepository(ComputadorRepository)

        const status = await computadorRepository.delete({ id })

        if (status.affected == 0)
            throw new AppError("Computador não encontrado")

        return true
    }
}

export default new DeleteImpressora()
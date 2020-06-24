import { getCustomRepository } from "typeorm"

import Computador from "../../../models/estoque/Computador"
import ComputadorRepository from "../../../repositories/estoque/ComputadorRepository"

/**
 * apagar foto lógica
 * 
 * import { join } from "path"
 * import computador from "../../../models/estoque/Computador"
 * import uploadConfig from "../../../../config/upload"
 * const fotoComputerFilePath = join(uploadConfig.directore, computador.foto)
 * await fotoComputerFileExist = await fs.promises.stat(fotoComputerFilePath)
 * 
 * if (fotoComputerFileExist) {
 *     await fs.promise.unlink(fotoComputerFilePath)
 * }
 */

interface Request {
    computador_id: string
    fotoFilename: string
}

class UploadFotoComputador {
    public async execute({ computador_id, fotoFilename }: Request): Promise<Computador | null> {
        const computadorRepository = getCustomRepository(ComputadorRepository)

        const computador = await computadorRepository.findOne({
            where: { id: computador_id }
        })

        if(!computador)
            return null

        computador.foto = fotoFilename

        await computadorRepository.save(computador)

        return computador
    }
}

export default new UploadFotoComputador()
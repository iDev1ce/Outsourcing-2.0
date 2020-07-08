import { getCustomRepository } from "typeorm"

import FotoRepository from "@app/repositories/FotoRepository"
import FotoComputador from "@app/models/FotoComputador"

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
    public async execute({ computador_id, fotoFilename }: Request): Promise<FotoComputador | null> {
        const fotoRepository = getCustomRepository(FotoRepository)

        const foto = fotoRepository.create({ foto: fotoFilename, computador_id })
        await fotoRepository.save(foto)

        const computador = await fotoRepository.findOne({
            relations: ['computador'],
            where: { computador_id }
        })

        if(!computador)
            return null

        return foto
    }
}

export default new UploadFotoComputador()
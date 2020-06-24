import { getCustomRepository } from "typeorm"

import FotoRepository from "../../../repositories/FotoRepository"
// import Fotos from "../../../../app/models/Fotos"
import Computador from "../../../../app/models/estoque/Computador"
import ComputadorRepository from "../../../../app/repositories/estoque/ComputadorRepository"

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
        const fotoRepository = getCustomRepository(FotoRepository)
        const computadorRepository = getCustomRepository(ComputadorRepository)

        const foto = fotoRepository.create({ foto: fotoFilename })
        const id_foto = await fotoRepository.save(foto)

        const computador = await computadorRepository.findOne(computador_id)

        if(!computador)
            return null

        computador.foto_id = id_foto.id
        await computadorRepository.save(computador)

        return computador
    }
}

export default new UploadFotoComputador()
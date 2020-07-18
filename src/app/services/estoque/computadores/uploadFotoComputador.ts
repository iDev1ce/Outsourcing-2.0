import { getCustomRepository } from "typeorm"

import FotoRepository from "@app/repositories/estoque/computador/FotoRepository"
import FotoComputador from "@app/models/estoque/computador/FotoComputador"
import IUpload from "@app/dto/computador/IUpload"

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

class UploadFotoComputador {
    public async execute({ computador_id, fotoFilename }: IUpload): Promise<FotoComputador | null> {
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
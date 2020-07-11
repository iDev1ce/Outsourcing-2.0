import { getCustomRepository } from "typeorm"

import FotoImpressoraRepository from "@app/repositories/FotoImpressoraRepository"
import FotoImpressora from "@app/models/FotoImpressora"

interface Request {
    impressora_id: string
    fotoFilename: string
}

class UploadFotoImpressora {
    public async execute({ impressora_id, fotoFilename }: Request): Promise<FotoImpressora | null> {
        const fotoImpressoraRepository = getCustomRepository(FotoImpressoraRepository)

        const foto = fotoImpressoraRepository.create({ foto: fotoFilename, impressora_id })
        await fotoImpressoraRepository.save(foto)

        const impressora = await fotoImpressoraRepository.findOne({
            relations: ['impressora'],
            where: { impressora_id }
        })

        if(!impressora)
            return null

        return foto
    }
}

export default new UploadFotoImpressora()
import { getCustomRepository } from "typeorm"

import FotoImpressoraRepository from "@app/repositories/estoque/impressora/FotoImpressoraRepository"
import FotoImpressora from "@app/models/estoque/impressora/FotoImpressora"
import IUpload from "@app/dto/impressora/IUpload"

class UploadFotoImpressora {
    public async execute({ impressora_id, fotoFilename }: IUpload): Promise<FotoImpressora | null> {
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
import { getCustomRepository } from "typeorm"

import FotoNotebookRepository from "@app/repositories/FotoNotebookRepository"
import FotoNotebook from "@app/models/FotoNotebook"

interface Request {
    notebook_id: string
    fotoFilename: string
}

class UploadFotoNotebook {
    public async execute({ notebook_id, fotoFilename }: Request): Promise<FotoNotebook | null> {
        const fotoNotebookRepository = getCustomRepository(FotoNotebookRepository)

        const foto = fotoNotebookRepository.create({ foto: fotoFilename, notebook_id })
        await fotoNotebookRepository.save(foto);

        const notebook = await fotoNotebookRepository.findOne({
            relations: ["notebook"],
            where: { notebook_id }
        })

        if(!notebook)
            return null

        return foto
    }
}

export default new UploadFotoNotebook()
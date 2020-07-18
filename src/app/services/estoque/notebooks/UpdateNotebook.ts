import { getCustomRepository } from "typeorm";

import Notebook from "@app/models/estoque/notebook/Notebooks";
import NotebookRepository from "@app/repositories/estoque/notebook/NotebookRepository"
import IUpdate from "@app/dto/notebook/IUpdate";

class UpdateNotebook {

    public async execute({ 
        id, 
        marca, 
        modelo, 
        memoriaRam, 
        placaVideo, 
        processador, 
        tamanhoDaTela, 
        valor 
    }:IUpdate):Promise<Notebook | null> {
        const notebookRepository = getCustomRepository(NotebookRepository)

        const existingNotebook = await notebookRepository.findOne(id)

        if (!existingNotebook) 
            return null

        const notebook = notebookRepository.create({ id, marca, modelo, memoriaRam, placaVideo, processador, tamanhoDaTela, valor })
        await notebookRepository.save(notebook)

        return notebook
    }
}

export default new UpdateNotebook()
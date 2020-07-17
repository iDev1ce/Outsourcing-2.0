import { getCustomRepository } from "typeorm";

import Notebook from "@app/models/estoque/notebook/Notebooks";
import NotebookRepository from "@app/repositories/estoque/notebook/NotebookRepository"

interface Request {
    id:string
    marca:string
    modelo:string
    memoriaRam:string
    placaVideo:string
    tipoPlacaVideo:string
    processador:string
    tamanhoDaTela:string
    valor: string
}

class UpdateNotebook {

    public async execute({ id, marca, modelo, memoriaRam, placaVideo, processador, tamanhoDaTela, valor }:Request):Promise<Notebook | null> {
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
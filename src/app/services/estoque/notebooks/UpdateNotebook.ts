import Notebook from "../../../models/estoque/Notebooks";

import NotebookRepository from "../../../repositories/estoque/NotebookRepository"
import { getCustomRepository } from "typeorm";
import AppError from "../../../../errors/AppError";

interface Request {
    id:string
    marca:string
    modelo:string
    memoriaRam:string
    placaVideo:string
    tipoPlacaVideo:string
    processador:string
    tamanhoDaTela:string
}

class UpdateNotebook {

    public async execute({ id, marca, modelo, memoriaRam, placaVideo, processador, tamanhoDaTela }:Request):Promise<Notebook | false> {
        const notebookRepository = getCustomRepository(NotebookRepository)

        const existingNotebook = await notebookRepository.findOne(id)

        if (!existingNotebook) 
            return false

        const notebook = notebookRepository.create({ id, marca, modelo, memoriaRam, placaVideo, processador, tamanhoDaTela })
        await notebookRepository.save(notebook)

        return notebook
    }
}

export default new UpdateNotebook()
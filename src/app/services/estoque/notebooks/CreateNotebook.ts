import Notebooks from "../../../models/estoque/Notebooks";

import NotebooksRepository from "../../../repositories/estoque/NotebookRepository"
import { getCustomRepository } from "typeorm";
import AppError from "../../../../shared/errors/AppError";

interface Request {
    marca:string
    modelo:string
    memoriaRam:string
    placaVideo:string
    tipoPlacaVideo:string
    processador:string
    tamanhoDaTela:string
}

class CreateNotebook {

    public async execute(
        { marca, modelo, memoriaRam, placaVideo, tipoPlacaVideo, processador, tamanhoDaTela }:Request
    ):Promise<Notebooks | null> {
        const notebooksRepository = getCustomRepository(NotebooksRepository)

        const notebook = notebooksRepository.create({ marca, modelo, memoriaRam, placaVideo, tipoPlacaVideo, processador, tamanhoDaTela })
        
        if (!await notebooksRepository.save(notebook))
            return null

        return notebook
    }
}

export default new CreateNotebook()
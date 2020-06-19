import Notebooks from "../../../models/estoque/Notebooks";

import NotebooksRepository from "../../../repositories/estoque/NotebookRepository"
import { getCustomRepository } from "typeorm";
import AppError from "../../../../errors/AppError";

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

    public async execute({ marca, modelo, memoriaRam, placaVideo, tipoPlacaVideo, processador, tamanhoDaTela }:Request):Promise<Notebooks | false> {
        try {
            const notebooksRepository = getCustomRepository(NotebooksRepository)
    
            const notebook = notebooksRepository.create({ marca, modelo, memoriaRam, placaVideo, tipoPlacaVideo, processador, tamanhoDaTela })
            await notebooksRepository.save(notebook)
    
            return notebook
        } catch (err) {
            return false
        }
    }
}

export default new CreateNotebook()
import { getCustomRepository } from "typeorm";

import Notebooks from "@app/models/estoque/notebook/Notebooks";
import NotebooksRepository from "@app/repositories/estoque/notebook/NotebookRepository"

interface Request {
    marca:string
    modelo:string
    memoriaRam:string
    placaVideo:string
    tipoPlacaVideo:string
    processador:string
    tamanhoDaTela:string
    id_funcionario: string
}

class CreateNotebook {

    public async execute(
        { marca, modelo, memoriaRam, placaVideo, tipoPlacaVideo, processador, tamanhoDaTela, id_funcionario }:Request
    ):Promise<Notebooks | null> {
        const notebooksRepository = getCustomRepository(NotebooksRepository)

        const notebook = notebooksRepository.create({ 
            marca, 
            modelo, 
            memoriaRam, 
            placaVideo, 
            tipoPlacaVideo, 
            processador, 
            tamanhoDaTela,
            id_funcionario 
        })
        
        if (!await notebooksRepository.save(notebook))
            return null

        return notebook
    }
}

export default new CreateNotebook()
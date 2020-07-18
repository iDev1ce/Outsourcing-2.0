import { getCustomRepository } from "typeorm";

import Notebooks from "@app/models/estoque/notebook/Notebooks";
import NotebooksRepository from "@app/repositories/estoque/notebook/NotebookRepository"
import ICreate from "@app/dto/notebook/ICreate";

class CreateNotebook {

    public async execute(
        { 
            marca, 
            modelo, 
            memoriaRam, 
            placaVideo, 
            tipoPlacaVideo, 
            processador, 
            tamanhoDaTela, 
            id_funcionario, 
            valor 
        }:ICreate
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
            id_funcionario,
            valor
        })
        
        if (!await notebooksRepository.save(notebook))
            return null

        return notebook
    }
}

export default new CreateNotebook()
import { getCustomRepository } from "typeorm";

import Notebook from "@app/models/estoque/notebook/Notebooks";
import NotebookRepository from "@app/repositories/estoque/notebook/NotebookRepository"

interface Request {
    id: string
}

class DeleteNotebook {

    public async execute({ id }:Request):Promise<true | null> {
        const notebookRepository = getCustomRepository(NotebookRepository)

        const status = await notebookRepository.delete({ id })

        if (status.affected == 0)
            return null

        return true
    }
}

export default new DeleteNotebook()
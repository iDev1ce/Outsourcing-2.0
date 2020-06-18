import Notebook from "../../../models/Notebooks";

import NotebookRepository from "../../../repositories/estoque/NotebookRepository"
import { getCustomRepository } from "typeorm";
import AppError from "../../../../errors/AppError";

interface Request {
    id: string
}

class DeleteNotebook {

    public async execute({ id }:Request):Promise<true | false> {
        const notebookRepository = getCustomRepository(NotebookRepository)

        const status = await notebookRepository.delete({ id })

        if (status.affected == 0)
            throw new AppError("Notebook não encontrado", 404)

        return true
    }
}

export default new DeleteNotebook()
import { getCustomRepository } from "typeorm";

import NotebookRepository from "@app/repositories/estoque/notebook/NotebookRepository"
import IDelete from "@app/dto/notebook/IDelete";

class DeleteNotebook {

    public async execute({ id }:IDelete):Promise<true | null> {
        const notebookRepository = getCustomRepository(NotebookRepository)

        const status = await notebookRepository.delete({ id })

        if (status.affected == 0)
            return null

        return true
    }
}

export default new DeleteNotebook()
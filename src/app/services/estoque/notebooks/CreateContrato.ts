import { getCustomRepository } from "typeorm"

import Contrato from "../../../models/Contrato";
import ContratoRepository from "../../../repositories/ContratoRepository"
import NotebookRepository from "../../../repositories/estoque/NotebookRepository";

interface Request {
    id_notebook: string
    id_cliente: string
}

class CreateContrato {
    public async execute({ id_notebook, id_cliente }: Request): Promise<Contrato | null> {
        const contratoRepository = getCustomRepository(ContratoRepository)
        const notebookRepository = getCustomRepository(NotebookRepository)

        const notebook = await notebookRepository.findOne({
            where: { id: id_notebook }
        })

        if(!notebook)
            return null

        const contrato = contratoRepository.create({ 
            id_cliente, 
            id_funcionario: notebook.id_funcionario
        })

        await contratoRepository.save(contrato)

        notebook.id_contrato = contrato.id

        const notebookSave = notebookRepository.create(notebook)
        await notebookRepository.save(notebookSave)

        return contrato
    }
}

export default new CreateContrato()
import { getCustomRepository } from "typeorm";

import Chamados from "@app/models/Chamados";
import ChamadoRepository from "@app/repositories/ChamadoRepository";
import NotebookRepository from "@app/repositories/estoque/NotebookRepository";

interface Request {
    id_notebook: string,
    id_cliente: string
    descricao: string
}

class CreateChamados {
    public async execute({ id_notebook, id_cliente, descricao }: Request): Promise<Chamados | null> {
        const chamadoRepository = getCustomRepository(ChamadoRepository)
        const notebookRepository = getCustomRepository(NotebookRepository)
        
        const notebook = await notebookRepository.findOne({ where: { id: id_notebook } })

        if(!notebook)
            return null
        
        const chamado = chamadoRepository.create({
            id_notebook,
            id_contrato: notebook.id_contrato,
            id_cliente,
            id_funcionario: notebook.id_funcionario,
            descricao
        })

        // const chamado = await chamadoRepository.find({
        //     relations: [
        //         'contrato',
        //         'notebook',
        //     ],
        //     where: { id_notebook }
        // })

        if(!chamado)
            return null

        

        await chamadoRepository.save(chamado)

        return chamado
    }
}

export default new CreateChamados()
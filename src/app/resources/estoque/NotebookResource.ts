import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"

import NotebooksRepository from "@app/repositories/estoque/NotebookRepository"

import createNotebook from "@app/services/estoque/notebooks/CreateNotebook"
import updateNotebook from "@app/services/estoque/notebooks/UpdateNotebook"
import deleteNotebook from "@app/services/estoque/notebooks/DeleteNotebook"
import NotebookRepository from "@app/repositories/estoque/NotebookRepository"
import createContrato from "@app/services/estoque/notebooks/CreateContrato"
import uploadFotoNotebook from "@app/services/estoque/notebooks/uploadFotoNotebook"
import createChamado from "@app/services/estoque/notebooks/createChamados"

class NotebookResource {

    public async getAll(req:Request, res:Response) {
        const notebooksRepository = getCustomRepository(NotebooksRepository)

        const notebooks = await notebooksRepository.find();

        if (!notebooks)
            return res.status(404).send({ message: "Não há notebooks" })

        return res.status(200).send(notebooks)
    }

    public async getById(req:Request, res:Response) {
        const notebooksRepository = getCustomRepository(NotebookRepository)

        const { id } = req.params

        const notebook = await notebooksRepository.findOne({ id })

        if (!notebook)
            return res.status(404).send({ message: "Não há notebook" })

        return res.status(200).send(notebook)
    }

    public async insert(req:Request, res:Response) {
        const { marca, modelo, memoriaRam, placaVideo, processador, tipoPlacaVideo, tamanhoDaTela } = req.body

        const notebook = await createNotebook.execute({ 
            marca, 
            memoriaRam, 
            modelo, 
            placaVideo, 
            processador, 
            tamanhoDaTela, 
            tipoPlacaVideo,
            id_funcionario: req.user.id
        })

        if (!notebook)
            return res.status(400).send({ message: "Erro ao salvar notebook" })

        return res.status(201).send(notebook)
    }

    public async update(req:Request, res:Response) {
        const { id } = req.params
        const { marca, modelo, memoriaRam, placaVideo, processador, tipoPlacaVideo, tamanhoDaTela } = req.body

        const notebook = await updateNotebook.execute({ 
            id, 
            marca, 
            modelo, 
            memoriaRam, 
            placaVideo, 
            processador, 
            tipoPlacaVideo, 
            tamanhoDaTela 
        })

        if (!notebook)
            return res.status(404).send({ message: "Não há notebook" })

        return res.status(200).send({ status: "Updated", notebook })
    }

    public async delete(req:Request, res:Response) {
        const { id } = req.params

        const deleteStatus = await deleteNotebook.execute({ id })

        if (!deleteStatus)
            return res.status(404).send({ message: "Não há notebooks" })

        return res.status(200).send({ message: "Notebook deletado com sucesso!" })
    }

    public async upload(req: Request, res: Response) {
        const { id } = req.params

        const foto = await uploadFotoNotebook.execute({
            notebook_id: id,
            fotoFilename: req.file.filename
        })

        return res.status(200).send(foto)
    }

    public async contrato(req: Request, res: Response) {
        const { id_notebook } = req.body

        const contrato = await createContrato.execute({
            id_notebook,
            id_cliente: req.user.id
        })

        if(!contrato)
            return res.status(400).send({ message: "Erro ao criar um contrato!" })

        return res.status(201).send(contrato)
    }

    public async chamados(req: Request, res: Response) {
        const { id_notebook, descricao } = req.body

        const chamado = await createChamado.execute({ 
            id_notebook,
            id_cliente: req.user.id,
            descricao 
        })

        if(!chamado)
            return res.status(400).send({ message: "Erro ao fazer um chamado!" })
        
        return res.status(201).send(chamado)
    }

}

export default new NotebookResource()
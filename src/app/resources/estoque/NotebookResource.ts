import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"

import NotebooksRepository from "../../repositories/estoque/NotebookRepository"

import createNotebook from "../../services/estoque/notebooks/CreateNotebook"
import updateNotebook from "../../services/estoque/notebooks/UpdateNotebook"
import deleteNotebook from "../../services/estoque/notebooks/DeleteNotebook"
import NotebookRepository from "../../repositories/estoque/NotebookRepository"

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
            tipoPlacaVideo 
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

}

export default new NotebookResource()
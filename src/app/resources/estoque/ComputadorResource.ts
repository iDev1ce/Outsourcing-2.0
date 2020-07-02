import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"

import ComputadorRepository from "../../repositories/estoque/ComputadorRepository"

import createComputador from "../../services/estoque/computadores/CreateComputador"
import updateComputador from "../../services/estoque/computadores/UpdateComputador"
import deleteComputador from "../../services/estoque/computadores/DeleteComputador"
import uploadFotoComputador from "../../services/estoque/computadores/uploadFotoComputador"
import createContrato from "../../services/estoque/computadores/CreateContrato"

class ComputadorResource {

    public async getAll(req:Request, res:Response) {

        const computadorRepository = getCustomRepository(ComputadorRepository)
    
        const computadores = await computadorRepository.find();

        if(!computadores)
            return res.send(404).send({ message: "Não há computadores" })

        return res.status(200).send(computadores)
    }

    public async getById(req:Request, res:Response) {
        const computadorRepository = getCustomRepository(ComputadorRepository)

        const { id } = req.params

        const computador = await computadorRepository.findOne({ id })

        if(!computador)
            return res.send(404).send({ message: "Não há computador" })

        return res.status(200).send(computador)
    }

    public async insert(req:Request, res:Response) {
        const { fonte,
                memoriaRam,
                mouse,
                monitor,
                placaMae,
                placaRede,
                placaVideo,
                processador,
                teclado } = req.body

        const computador = await createComputador.execute({
            fonte,
            memoriaRam,
            mouse,
            monitor,
            placaMae,
            placaRede,
            placaVideo,
            processador,
            teclado,
            id_funcionario: req.user.id
        })

        if(!computador)
            return res.send(404).send({ message: "Erro ao salvar computador" })

        return res.status(201).send(computador)
    }

    public async update(req:Request, res:Response) {
        const { id } = req.params

        const { 
            fonte,
            memoriaRam,
            monitor,
            mouse,
            placaMae,
            placaRede,
            placaVideo,
            processador,
            teclado
            } = req.body

        const computador = await updateComputador.execute({ 
            id,
            fonte,
            memoriaRam,
            monitor,
            mouse,
            placaMae,
            placaRede,
            placaVideo,
            processador,
            teclado
        })

        if(!computador)
            return res.send(404).send({ message: "Não há computador" })

        return res.status(200).send({ status: "Updated", computador })
    }

    public async upload(req: Request, res: Response) {
        const { id } = req.params

        const foto = await uploadFotoComputador.execute({
            computador_id: id,
            fotoFilename: req.file.filename
        })

        return res.status(200).send(foto)
    }

    public async delete(req:Request, res:Response) {
        const { id } = req.params

        const deleteStatus = await deleteComputador.execute({ id })

        if(deleteStatus == false)
            return res.status(404).send({ message: "Não há computadores" })
            
        return res.status(200).send({ message: "Computador deletado com sucesso!" })
    }

    public async contrato(req:Request, res:Response) {
        const { id_computador } = req.body

        const contrato = createContrato.execute({
            id_computador,
            id_cliente: req.user.id
        })

        if (!contrato)
            return res.status(400).send({ message: "Erro ao criar o contrato" })

        return res.status(201).send(contrato)
    }
}

export default new ComputadorResource()
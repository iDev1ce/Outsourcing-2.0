import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"

import ComputadorRepository from "@app/repositories/estoque/ComputadorRepository"
import ChamadoRepository from "@app/repositories/ChamadoRepository"

import createComputador from "@app/services/estoque/computadores/CreateComputador"
import updateComputador from "@app/services/estoque/computadores/UpdateComputador"
import deleteComputador from "@app/services/estoque/computadores/DeleteComputador"
import uploadFotoComputador from "@app/services/estoque/computadores/uploadFotoComputador"
import createContrato from "@app/services/estoque/computadores/CreateContrato"
import createChamado from "@app/services/estoque/computadores/CreateChamado"

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
        const { 
            fonte,
            memoriaRam,
            mouse,
            monitor,
            placaMae,
            placaRede,
            placaVideo,
            processador,
            teclado 
        } = req.body

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

        const contrato = await createContrato.execute({
            id_computador,
            id_cliente: req.user.id
        })

        if (!contrato)
            return res.status(400).send({ message: "Erro ao criar o contrato" })

        return res.status(201).send(contrato)
    }

    public async chamado(req: Request, res: Response) {
        const { id_maquina } = req.body

        const chamado = await createChamado.execute({ id_maquina: id_maquina })

        if(!chamado)
            return res.status(400).send({ message: "Erro ao fazer um chamado!" })
        
        return res.status(201).send(chamado)
    }

    public async getAllChamados(req: Request, res: Response) {
        const { id_maquina } = req.params
        // const computadorRepository = getCustomRepository(ComputadorRepository)
        const chamadoRepository = getCustomRepository(ChamadoRepository)

        const chamados = await chamadoRepository.find({
            relations: ["computador"],
            where: { id_computador: id_maquina }
        })
        
        if(!chamados)
            return res.status(404).send("Chamados não encontrados")
        
        return res.status(200).send(chamados)
    }
}

export default new ComputadorResource()
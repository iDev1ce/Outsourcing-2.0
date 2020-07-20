import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"

import ImpressoraRepository from "@app/repositories/estoque/impressora/ImpressoraRepository"

import createImpressora from "@app/services/estoque/impressoras/CreateImpressora"
import updateImpressora from "@app/services/estoque/impressoras/UpdateImpressora"
import deleteImpressora from "@app/services/estoque/impressoras/DeleteImpressora"
import createContrato from "@app/services/estoque/impressoras/CreateContrato"
import uploadFotoImpressora from "@app/services/estoque/impressoras/uploadFotoImpressora"
import createChamado from "@app/services/estoque/impressoras/CreateChamado"

class ImpressoraResource {

    public async getAll(req:Request, res:Response) {
        const impressoraRepository = getCustomRepository(ImpressoraRepository)

        const impressoras = await impressoraRepository.find({
            where: { id_funcionario: req.user.id }
        })

        if(!impressoras)
            return res.status(404).send({ message: "Não há impressoras" })

        return res.status(200).send(impressoras)
    }

    public async get(req:Request, res:Response) {
        const impressoraRepository = getCustomRepository(ImpressoraRepository)

        const impressoras = await impressoraRepository.find()

        if(!impressoras)
            return res.status(404).send({ message: "Não há impressoras" })

        return res.status(200).send(impressoras)
    }


    public async getAllCliente(req:Request, res:Response) {
        const impressoraRepository = getCustomRepository(ImpressoraRepository)

        const impressoras = await impressoraRepository.find({
            where: { id_contrato: null }
        })

        if(!impressoras)
            return res.status(404).send({ message: "Não há impressoras" })

        return res.status(200).send(impressoras)
    }

    public async getById(req:Request, res:Response) {
        const impressoraRepository = getCustomRepository(ImpressoraRepository)

        const { id } = req.params

        const impressora = await impressoraRepository.findOne({ id })

        if(!impressora)
            return res.status(404).send({ message: "Não há impressora" })

        return res.status(200).send(impressora)
    }

    public async insert(req:Request, res:Response) {
        const { marca, modelo, tipo, valor } = req.body

        const impressora = await createImpressora.execute({ 
            marca,
            modelo, 
            tipo,
            valor,
            id_funcionario: req.user.id
        })

        if(!impressora)
            return res.status(400).send({ message: "Erro ao salvar impressora" })

        return res.status(201).send(impressora)
    }

    public async update(req:Request, res:Response) {
        const { id } = req.params
        const { marca, modelo, tipo, valor } = req.body

        const impressora = await updateImpressora.execute({ id, marca, modelo, tipo, valor })

        if(!impressora)
            return res.status(404).send({ message: "Não há impressora" })

        return res.status(200).send({ status: "Updated", impressora })
    }

    public async delete(req:Request, res:Response) {
        const { id } = req.params

        const deleteStatus = await deleteImpressora.execute({ id })

        if(deleteStatus == null)
            return res.status(404).send({ message: "Não há impressora" })
        
        return res.status(200).send({ message: "Impressora deletada com sucesso!" })
    }

    public async upload(req: Request, res: Response) {
        const { id } = req.params

        const foto = await uploadFotoImpressora.execute({
            impressora_id: id,
            fotoFilename: req.file.filename
        })

        return res.status(200).send(foto)
    }

    public async contrato(req: Request, res: Response) {
        const { id_impressora } = req.body

        const contrato = await createContrato.execute({ 
            id_impressora,
            id_cliente: req.user.id
        })

        if(!contrato)
            return res.status(400).send({ message: "Erro ao criar um contrato!" })
        
        return res.status(201).send(contrato)
    }

    public async chamado(req:Request, res: Response) {
        const { id_impressora, descricao } = req.body

        const chamado = await createChamado.execute({ 
            id_impressora,
            id_cliente: req.user.id,
            descricao 
        })

        if(!chamado)
            return res.status(400).send({ message: "Erro ao fazer um chamado!" })
        
        return res.status(201).send(chamado)
    }
}

export default new ImpressoraResource()
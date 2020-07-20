import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"

import ContratoRepository from "@app/repositories/ContratoRepository"
import createContrato from '@app/services/contratos/CreateContrato'
import ComputadorRepository from "@app/repositories/estoque/computador/ComputadorRepository"
import ImpressoraRepository from "@app/repositories/estoque/impressora/ImpressoraRepository"
import NotebookRepository from "@app/repositories/estoque/notebook/NotebookRepository"
import UsuarioRepository from "@app/repositories/UsuarioRepository"

class ContratoResource {
    public async insert(req: Request, res: Response) {const contratoRepository = getCustomRepository(ContratoRepository)
        const computadorRepository = getCustomRepository(ComputadorRepository)
        const impressoraRepository = getCustomRepository(ImpressoraRepository)
        const notebookRepository = getCustomRepository(NotebookRepository)
        const usuarioRepository = getCustomRepository(UsuarioRepository)

        const { id_maquinas } = req.body

        const enderacoEmpresa = await usuarioRepository.findOne({
            where: { id: req.user.id }
        })

        if(enderacoEmpresa?.id_empresa === null)
            return res.status(400).send({ message: "Vocẽ naõ informou seu endereço!" })

        let valorTotal = []
        for(let i = 0; i <= id_maquinas.length; i++) {
            const computador = await computadorRepository.findOne({
                where: { id: id_maquinas[i] }
            })

            const notebook = await notebookRepository.findOne({
                where: { id: id_maquinas[i] }
            })

            const impressora = await impressoraRepository.findOne({
                where: { id: id_maquinas[i] }
            })
            if(computador) {
                valorTotal.push(Number(computador.valor))
            } else if(notebook) {
                valorTotal.push(Number(notebook.valor))
            } else if(impressora) {
                valorTotal.push(Number(impressora.valor))
            } 
        }

        const total = valorTotal.reduce((total, valorTotal) => {
            return total + valorTotal
        })

        const valor = String(total)

        const contrato = await createContrato.execute({ 
            id_maquinas,
            valor,
            id_cliente: req.user.id 
        })

        if(!contrato)
            return res.status(400).send({ message: "erro ao criar contrato" })

        return res.status(201).send(contrato)
    }

    public async getClienteAll(req: Request, res: Response) {
        const contratoRepository = getCustomRepository(ContratoRepository)

        const contratos = await contratoRepository.find({
            relations: ["funcionario"],
            where: { id_cliente: req.user.id }
        })

        if (!contratos)
            return res.status(404).send({ message: "Não há contratos" })

        return res.status(200).send(contratos)
    }

    public async getFuncionarioAll(req: Request, res: Response) {
        const contratoRepository = getCustomRepository(ContratoRepository)

        const contratos = await contratoRepository.find({
            where: { id_funcionario: req.user.id }
        })

        if (!contratos)
            return res.status(404).send({ message: "Não há contratos" })

        return res.status(200).send(contratos)
    }

    public async getById(req: Request, res: Response) {
        const contratoRepository = getCustomRepository(ContratoRepository)

        const { id } = req.params

        const contrato = await contratoRepository.findOne({
            relations: ["funcionario"],
            where: { id } 
        })

        if (!contrato)
            return res.status(404).send({ message: "Não existe contrato" })
        
        return res.status(200).send(contrato)
    }
}

export default new ContratoResource()
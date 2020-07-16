import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import createFuncionario from "@app/services/funcionarios/createFuncionario"
import authFuncionario from "@app/services/funcionarios/authFuncionario"
import ChamadoRepository from "@app/repositories/ChamadoRepository"
import ContratoRepository from "@app/repositories/ContratoRepository";
import FuncionarioRepository from "@app/repositories/FuncionarioRepository";
import UsuarioRepository from "@app/repositories/UsuarioRepository";

class FuncionariosResource {
    public async singIn(req: Request, res: Response) {
        const { cpf, nome, email, senha } = req.body

        const funcionario = await createFuncionario.execute({ 
            cpf, 
            nome, 
            email, 
            senha
        })
        
        if(funcionario === "cpf")
            return res.status(400).send({ message: "CPF já está em uso" })
        
        if(funcionario === "email") 
            return res.status(400).send({ message: "Email já em uso" })


        if (!funcionario)
            return res.status(400).send({ message: "Erro ao salvar funcionário" })

        return res.status(201).send(funcionario)
    }

    public async login(req: Request, res: Response) {
        const { email, senha } = req.body
        
        const funcionario = await authFuncionario.execute({ email, senha })

        if (!funcionario)
            return res.status(400).send({ message: "email/senha inválido" })

        return res.status(200).send(funcionario)
    }

    public async getAllChamados(req:Request, res:Response) {
        const chamadoRepository = getCustomRepository(ChamadoRepository)
        const usuarioRepository = getCustomRepository(UsuarioRepository)

        const chamados = await chamadoRepository.find({
            select: ["id_cliente", "id_contrato", "descricao"],
            relations: ["computador", "impressora", "notebook"]
        })

        if(chamados[0].computador === null)
            delete chamados[0].computador

        if(chamados[0].notebook === null)
            delete chamados[0].notebook

        if(chamados[0].impressora === null)
            delete chamados[0].impressora

        const usuario = await usuarioRepository.find({
            relations: ["empresa"],
            where: { id: chamados[0].id_cliente }
        })

        delete usuario[0].senha
        delete usuario[0].cpf
        delete usuario[0].nome
        delete usuario[0].cpf
        delete usuario[0].email
        delete usuario[0].id
        delete usuario[0].id_empresa

        if(!chamados)
            return res.status(404).send("Não há chamados")

        return res.status(200).send({ chamados, usuario })
    }

    public async getAllContratos(req: Request, res: Response) {
        const contratoRepository = getCustomRepository(ContratoRepository)

        const contratos = await contratoRepository.find({
            select: ["id_cliente"],
            relations: ["cliente"]
        })

        delete contratos[0].cliente.senha
        delete contratos[0].cliente.cpf

        if(contratos.length === 0)
            return res.status(404).send({ message: "Ainda não tem um contrato" })
        
        return res.status(200).send(contratos)
    }
}

export default new FuncionariosResource()
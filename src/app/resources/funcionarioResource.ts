import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import createFuncionario from "@app/services/funcionarios/createFuncionario"
import authFuncionario from "@app/services/funcionarios/authFuncionario"
import ContratoRepository from "@app/repositories/ContratoRepository";

class FuncionariosResource {
    public async singIn(req: Request, res: Response) {
        const { cpf, nome, email, senha } = req.body

        const funcionario = await createFuncionario.execute({ cpf, nome, email, senha })

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

    public async getAllContratos(req: Request, res: Response) {
        const contratoRepository = getCustomRepository(ContratoRepository)

        const contratos = await contratoRepository.find({
            where: { id_funcionario: req.user.id }
        })

        if(!contratos)
            return res.status(404).send({ message: "Não há contratos" })

        return res.status(200).send(contratos)
    }
}

export default new FuncionariosResource()
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import createFuncionario from "@app/services/funcionarios/createFuncionario"
import authFuncionario from "@app/services/funcionarios/authFuncionario"
import ContratoRepository from "@app/repositories/ContratoRepository";

class FuncionariosResource {
    public async singIn(req: Request, res: Response) {
        const { cpf, nome, email, senha } = req.body

        const funcionario = await createFuncionario.execute({ cpf, nome, email, senha })
        
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

    public async getAllContratos(req: Request, res: Response) {
        const contratoRepository = getCustomRepository(ContratoRepository)

        const contratos = await contratoRepository.find({
            relations: ['funcionario'],
            where: { id_funcionario: req.user.id }
        })

        if(contratos.length === 0)
            return res.status(404).send({ message: "Ainda não tem um contrato" })
        
        return res.status(200).send({ contratos: contratos })
    }
}

export default new FuncionariosResource()
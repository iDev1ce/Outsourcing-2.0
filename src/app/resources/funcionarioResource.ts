import { Request, Response } from "express";

import createFuncionario from "../services/funcionarios/createFuncionario"
import authFuncionario from "../services/funcionarios/authFuncionario"

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
}

export default new FuncionariosResource()
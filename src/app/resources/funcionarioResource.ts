import { Request, Response } from "express";

import createFuncionario from "../services/funcionarios/createFuncionario"
import authFuncionario from "../services/funcionarios/authFuncionario"
import AppError from "../../errors/AppError";

class FuncionariosResource {
    public async singIn(req: Request, res: Response) {
        const { cpf, nome, email, senha } = req.body

        const funcionario = await createFuncionario.execute({ cpf, nome, email, senha })

        return res.status(201).send(funcionario)
    }

    public async login(req: Request, res: Response) {
        const { email, senha } = req.body
        
        const funcionario = await authFuncionario.execute({ email, senha })

        if(!funcionario)
            throw new AppError("Erro ao logar")

        return res.status(200).send(funcionario)
    }
}

export default new FuncionariosResource()
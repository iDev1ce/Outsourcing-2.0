import { Request, Response } from "express";

import createFuncionario from "../services/funcionarios/createFuncionario"
import authFuncionario from "../services/funcionarios/authFuncionario"

class FuncionariosResource {
    public async singIn(req: Request, res: Response) {
        try {
            const { cpf, nome, email, senha } = req.body

            const funcionario = await createFuncionario.execute({ cpf, nome, email, senha })

            return res.status(201).send(funcionario)
        } catch (err) {
            return res.status(err.statusCode).send({ error: err.message })
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body
            
            const funcionario = await authFuncionario.execute({ email, senha })
    
            return res.status(200).send(funcionario)
        } catch (err) {
            return res.status(err.statusCode).send({ error: err.message })
        }
        
    }
}

export default new FuncionariosResource()
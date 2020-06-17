import { getCustomRepository } from "typeorm"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import Funcionario from "../../models/Funcionarios";
import FuncionarioRepository from "../../repositories/FuncionarioRepository";
import authConfig from "../../../config/auth"

interface Request {
    email: string
    senha: string
}

interface Response {
    funcionario: Funcionario
    token: string
}

class AuthFuncionario {
    public async execute({ email, senha }: Request): Promise<Response | null> {
        const funcionarioRepository = getCustomRepository(FuncionarioRepository)

        const existingFuncionario = await funcionarioRepository.findOne({
            where: { email }
        })

        if(!existingFuncionario)
            throw new Error("Email/senha inválido")

        if(!await compare(senha, existingFuncionario.senha))
            throw new Error("Email/senha inválido")

        const { secret, expiresIn } = authConfig

        const token = sign({}, secret, {
            subject: existingFuncionario.id,
            expiresIn: expiresIn
        })

        delete existingFuncionario.senha
        delete existingFuncionario.email

        const funcionario = existingFuncionario

        return {
            funcionario,
            token
        }
    }
}

export default new AuthFuncionario()